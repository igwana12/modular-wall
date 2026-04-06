# 3D Printing & Manufacturing Services — Integration Plan

**Date**: 2026-04-06
**Status**: Research needed — no 3D printer available locally
**Priority**: HIGH — blocks physical prototyping

---

## The Need

No local 3D printer. All enclosures, desk stands, corner brackets, and test parts must be ordered from external services. Ideally with API integration so we can:

1. Upload STL files programmatically from our Blender pipeline
2. Get instant quotes
3. Order with one click
4. Track shipping

---

## Services to Research

### 3D Printing Services (FDM — PETG/ABS)

| Service | API? | Materials | Notes |
|---------|------|-----------|-------|
| **Shapeways** | Had API, check current status | PETG, Nylon, metals | Pioneer in on-demand 3D printing |
| **JLCPCB 3D Printing** | REST API (same as PCB ordering) | SLA resin, SLS nylon, MJF | Already need account for PCBs |
| **PCBWay 3D Printing** | API available | FDM, SLA, SLS, MJF | Also does PCBs — one vendor for both |
| **Xometry** | Instant Quoting API | FDM, SLA, SLS, CNC | Professional manufacturing |
| **Hubs (3D Hubs)** | API (now Protolabs Network) | FDM, SLA, SLS, MJF | Marketplace of local manufacturers |
| **Craftcloud (All3DP)** | Price comparison, no direct API | Aggregates multiple services | Good for comparing prices |
| **Sculpteo** | API available | FDM, SLA, SLS, metals | French company, ships globally |
| **Treatstock** | Marketplace API | Varies by provider | Connects to local print farms |

### Resin Printing (SLA — for detailed parts, figurines)

| Service | Best For | Notes |
|---------|----------|-------|
| **JLCPCB SLA** | Smooth detailed parts | Cheapest SLA, ships from China |
| **Shapeways** | Consumer-quality resin | US-based |
| **Formlabs Print Service** | Premium dental/engineering resin | Expensive but excellent |

### Laser Cutting (Acrylic panels)

| Service | API? | Materials | Notes |
|---------|------|-----------|-------|
| **SendCutSend** | Instant quoting, no formal API | Acrylic, metals, wood | US-based, fast turnaround |
| **Ponoko** | API available | Acrylic, wood, metals | NZ-based, ships globally |
| **Canal Plastics** | Manual ordering | Acrylic specialists | NYC-based, custom cuts |

### PCB Manufacturing

| Service | API? | Notes |
|---------|------|-------|
| **JLCPCB** | REST API | $2-5 per board, 5-day turnaround |
| **PCBWay** | REST API | Similar pricing, also does assembly |
| **OSH Park** | No API | US-based, purple boards, higher quality |

---

## Ideal Workflow

```
[Blender Model] 
    → Export STL
    → Upload via API to printing service
    → Get instant quote
    → Approve and order
    → Track shipment
    → Receive part
    → Assemble with electronics
```

### Automated Pipeline (Future)

```python
# Example: order a module housing from JLCPCB
import requests

stl_file = "assets/blender/modules/screen-s.stl"
response = requests.post("https://api.jlcpcb.com/3d/quote", 
    files={"file": open(stl_file, "rb")},
    data={
        "material": "PETG",
        "color": "black",
        "quantity": 2,
        "infill": 50,
    }
)
quote = response.json()
print(f"Price: ${quote['price']}, Ships in {quote['days']} days")
```

---

## Parts We Need Printed (Phase 0)

| Part | Dimensions | Material | Quantity | Notes |
|------|-----------|----------|----------|-------|
| Screen-S housing | 76x116x20mm | PETG (black) | 2 | Portrait rectangle |
| Glow housing | 71x71x20mm | PETG (black) | 2 | Square with diffuser slot |
| Desk wedge stand | ~80x60x30mm | PETG (black) | 2 | 15° angle, weighted |
| Corner brackets (15mm) | ~25x25x25mm | PETG (black) | 8 | For MakerBeamXL frame |
| Brick (plain filler) | 71x71x20mm | PETG (black) | 2 | Solid, no electronics |

**Estimated total: 5 unique parts x 2 each = 10 prints**

### Acrylic Parts

| Part | Dimensions | Material | Quantity | Notes |
|------|-----------|----------|----------|-------|
| Screen-S front panel | 76x116x2mm | Gray Smoke #2064 | 2 | Laser cut |
| Glow diffuser panel | 71x71x2mm | Black LED Diffusion | 2 | Laser cut |

---

## Budget Estimate

| Item | Estimated Cost |
|------|---------------|
| 10 PETG prints (JLCPCB/PCBWay) | $30-60 |
| 4 acrylic panels (SendCutSend) | $15-30 |
| Shipping | $10-20 |
| **Total Phase 0 printing** | **$55-110** |

---

## Research Complete — Ranked Results

| Rank | Service | API | PETG | Resin | Price (71x71x20mm) | Turnaround | Notes |
|------|---------|-----|------|-------|--------------------|------------|-------|
| **1** | **Slant 3D** | Excellent (API-first) | Yes | No | $5-12 | 2-5 days (US) | Built for programmatic ordering. US print farm. |
| **2** | **JLC3DP** | Good (full API) | Yes | Yes | $5-15 | 4 days + ship | Cheapest. Resin for figurines. Partner approval needed. |
| **3** | **Treatstock** | Good (marketplace) | Yes | Yes | $8-25 | 2-14 days | Multi-vendor comparison. GitHub API docs. |
| **4** | **Sculpteo** | Good (full API) | Yes | Yes | $15-35 | 7-10 days | Dassault-backed. Invoice payment friction. |
| **5** | **Craftcloud** | Fair (Swagger) | Yes | Yes | $8-20 | Varies | Price comparison, 200 manufacturers. |

### Decision: Slant 3D (Primary) + JLC3DP (Backup/Resin)

- **Slant 3D API**: slant3dapi.com/documentation — file upload, slicing, pricing, ordering, tracking
- **JLC3DP API**: jlc3dp.com/help/article/JLC3DP-API — requires partner application
- **Laser cutting**: SendCutSend (no API, manual order) or Ponoko (no API, Bay Area shipping)

### Other Services Evaluated
- **Shapeways**: $300 min per color, post-bankruptcy risk — skip
- **Xometry**: API is tracking-only, no quoting/ordering — skip
- **Protolabs (Hubs)**: No API — skip
- **PCBWay**: 3D API unclear, contact needed — backup option
- **i.materialise**: Industrial quality, higher price — skip for prototyping

## Action Items

1. [x] Research: which services have working APIs in 2026
2. [ ] Create Slant 3D account and test API with one part
3. [ ] Create JLC3DP partner application for API access
4. [ ] Export STL files from all Blender models (blocked by MCP context)
5. [ ] Order first test print via Slant 3D API (one Screen-S housing)
6. [ ] Order acrylic panels from SendCutSend (manual)
7. [ ] Build API integration script (Python) for automated ordering
8. [ ] Add 3D printing service info to master CSV

---

*No printer? No problem. The internet is your print farm.*
