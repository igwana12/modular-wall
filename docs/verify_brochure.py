#!/usr/bin/env python3
"""
Verify the mosAIc brochure PDF
"""
import os
from PyPDF2 import PdfReader

def verify_brochure():
    """Verify the brochure PDF file"""
    pdf_path = "/Volumes/AI_WORKSPACE/modular-wall/docs/mosaic-brochure-2026.pdf"
    
    if not os.path.exists(pdf_path):
        print(f"❌ PDF file not found: {pdf_path}")
        return False
    
    try:
        reader = PdfReader(pdf_path)
        num_pages = len(reader.pages)
        
        print(f"✅ PDF verification successful:")
        print(f"   📄 File: {pdf_path}")
        print(f"   📑 Pages: {num_pages}")
        print(f"   📏 Size: {os.path.getsize(pdf_path)} bytes")
        
        if hasattr(reader, 'metadata') and reader.metadata:
            metadata = reader.metadata
            print(f"   📝 Title: {metadata.get('/Title', 'N/A')}")
            print(f"   👤 Author: {metadata.get('/Author', 'N/A')}")
            print(f"   📋 Subject: {metadata.get('/Subject', 'N/A')}")
        
        if num_pages == 12:
            print("✅ Correct number of pages (12)")
        else:
            print(f"⚠️  Expected 12 pages, found {num_pages}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error reading PDF: {e}")
        return False

if __name__ == "__main__":
    verify_brochure()