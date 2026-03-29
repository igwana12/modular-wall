"""RAG context retrieval for oracle readings.

Supports ChromaDB (primary) with fallback to deity mythology keywords.
Pinecone support stubbed for future Phase 2/3 if needed.
"""
from __future__ import annotations

import logging
import os
from pathlib import Path

logger = logging.getLogger("orb-backend.rag")

# ChromaDB configuration
CHROMA_DB_PATH = os.getenv("CHROMA_DB_PATH", "")

# Module-level ChromaDB client (lazy init)
_chroma_client = None
_chroma_collections: list = []


def _init_chroma() -> bool:
    """Initialize ChromaDB persistent client. Returns True if successful."""
    global _chroma_client, _chroma_collections

    if not CHROMA_DB_PATH or not Path(CHROMA_DB_PATH).exists():
        logger.warning(f"ChromaDB path not found: {CHROMA_DB_PATH}")
        return False

    try:
        import chromadb

        _chroma_client = chromadb.PersistentClient(path=CHROMA_DB_PATH)
        _chroma_collections = _chroma_client.list_collections()
        names = [c.name for c in _chroma_collections]
        logger.info(f"ChromaDB initialized: {len(_chroma_collections)} collections: {names}")
        return True
    except Exception as e:
        logger.error(f"Failed to initialize ChromaDB: {e}")
        _chroma_client = None
        return False


async def get_reading_context(deity_id: str, intent: str, max_chunks: int = 5) -> str:
    """Retrieve mythology-relevant context for an oracle reading.

    Strategy:
    1. Try ChromaDB vector search with deity name + intent
    2. Fall back to deity JSON config mythology_keywords if ChromaDB unavailable

    Returns concatenated text chunks from vector store.
    """
    # Try ChromaDB first
    context = _query_chroma(deity_id, intent, max_chunks)
    if context:
        logger.info(f"RAG context retrieved from ChromaDB for {deity_id} ({len(context)} chars)")
        return context

    # Fallback: use deity mythology keywords as static context
    context = _fallback_keywords(deity_id, intent)
    logger.info(f"RAG fallback to keywords for {deity_id} ({len(context)} chars)")
    return context


def _query_chroma(deity_id: str, intent: str, max_chunks: int) -> str:
    """Query ChromaDB for relevant mythology context."""
    global _chroma_client

    if _chroma_client is None:
        if not _init_chroma():
            return ""

    try:
        # Build search query combining deity name and user intent
        query_text = f"{deity_id} Greek mythology {intent}"

        # Try each collection -- they may have different content types
        all_results = []
        for collection in _chroma_collections:
            try:
                col = _chroma_client.get_collection(collection.name)
                results = col.query(
                    query_texts=[query_text],
                    n_results=max_chunks,
                )
                if results and results.get("documents"):
                    for doc_list in results["documents"]:
                        all_results.extend(doc_list)
            except Exception as e:
                logger.debug(f"Collection {collection.name} query failed: {e}")
                continue

        if all_results:
            # Deduplicate and join
            seen = set()
            unique = []
            for doc in all_results:
                if doc and doc not in seen:
                    seen.add(doc)
                    unique.append(doc)
            # Take top max_chunks unique results
            return "\n\n".join(unique[:max_chunks])

    except Exception as e:
        logger.error(f"ChromaDB query failed: {e}")

    return ""


def _fallback_keywords(deity_id: str, intent: str) -> str:
    """Generate basic context from deity config mythology keywords."""
    from deity_config import load_deity

    config = load_deity(deity_id)
    if not config:
        return f"Oracle reading for the deity {deity_id} on the topic: {intent}"

    name = config.get("name", deity_id.title())
    title = config.get("title", "")
    keywords = config.get("mythology_keywords", [])
    style = config.get("reading_style", "")
    mckee = config.get("mckee_guidance", "")

    parts = [
        f"{name}, {title}.",
        f"Domain keywords: {', '.join(keywords)}." if keywords else "",
        f"Reading style: {style}." if style else "",
        f"Narrative guidance: {mckee}" if mckee else "",
    ]
    return "\n".join(p for p in parts if p)


def rag_available() -> bool:
    """Check if RAG (ChromaDB) is available and working."""
    if _chroma_client is not None:
        return True
    return _init_chroma()


def rag_source() -> str:
    """Return which RAG backend is currently active.

    Returns 'chromadb' if ChromaDB is initialized and available,
    otherwise 'keywords' (deity config fallback).
    """
    if _chroma_client is not None:
        return "chromadb"
    if _init_chroma():
        return "chromadb"
    return "keywords"
