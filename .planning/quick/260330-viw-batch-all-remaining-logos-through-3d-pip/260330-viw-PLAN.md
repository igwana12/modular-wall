---
phase: quick/260330-viw
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/batch_pipeline.py
  - /Volumes/Extreme Pro/ACTIVE/jarvis/frontend/src/App.tsx
autonomous: true
requirements: [ad-hoc]

must_haves:
  truths:
    - "batch_pipeline.py can vectorize any ~/Downloads/IMG_7*.JPG to SVG and render to MP4"
    - "Already-processed logos (zeus-lightning, gorilla-profile, rosette) are skipped"
    - "Script runs unattended in background for ~2h without intervention"
    - "JARVIS App.tsx shows spinning deity logo overlay when deity name appears in chat"
  artifacts:
    - path: "/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/batch_pipeline.py"
      provides: "Batch vectorize+render script"
      min_lines: 80
    - path: "/Volumes/Extreme Pro/ACTIVE/jarvis/frontend/src/App.tsx"
      provides: "JARVIS UI with deity logo overlay"
  key_links:
    - from: "batch_pipeline.py"
      to: "vectorize_v2.py + blender_extrude_render.py"
      via: "subprocess calls to python3 and blender"
      pattern: "subprocess\\.run.*vectorize|subprocess\\.run.*blender"
    - from: "App.tsx deity overlay"
      to: "/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/*.mp4"
      via: "HTML5 video element src mapped from deity name"
      pattern: "video.*src.*renders"
---

<objective>
Batch all 67 remaining logo images through the proven 3D pipeline (vectorize to SVG, Blender extrude+render to MP4), then wire deity logo overlays into the JARVIS frontend.

Purpose: Complete the full logo library for JARVIS MediaDirector integration. Batch script runs in background (~2h). JARVIS overlay gives immediate visual richness when deities are mentioned.
Output: batch_pipeline.py script (kicked off in background), JARVIS App.tsx with deity overlay component.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/.continue-here.md
@/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/vectorize_v2.py
@/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/blender_extrude_render.py

<interfaces>
<!-- Existing pipeline scripts the batch script must call -->

vectorize_v2.py accepts hardcoded HERO_IMAGES dict — batch script must replicate the
clean_and_vectorize() logic directly (not import it, since it's hardcoded).
Key function signature:
  clean_and_vectorize(name: str, src: Path) -> bool
Uses: PIL for blur/threshold/crop, potrace CLI for SVG output.
Default settings: blur=2, threshold=140, turdsize=20.

blender_extrude_render.py is called via CLI:
  blender --background --python blender_extrude_render.py -- <svg_path> <name> <render_dir>
Produces: {render_dir}/{name}_seq/ (PNG frames) and {render_dir}/{name}-turntable.mp4

JARVIS App.tsx (1524 lines, single-file React app):
  - WebSocket at ws://localhost:8765, messages parsed as JSON
  - msg.type === 'metrics' | 'workflow_update' | 'job_progress'
  - No existing overlay/media system — this is net new
  - Styles defined inline as JS objects at bottom of file
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Write batch_pipeline.py and kick off background renders</name>
  <files>/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/batch_pipeline.py</files>
  <action>
Create batch_pipeline.py that:

1. Scans ~/Downloads/IMG_7*.JPG (glob), sorts numerically
2. Checks existing SVGs in /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/ — skip any image whose derived name already has an SVG
3. Already-done mapping: IMG_7046=zeus-lightning, IMG_7040=gorilla-profile, IMG_7038=rosette (skip these explicitly)
4. For each remaining image:
   a. Derive name from filename: IMG_7036.JPG -> "img-7036"
   b. Replicate vectorize_v2.py logic inline (do NOT import — the original is hardcoded):
      - Load with PIL, convert to grayscale
      - GaussianBlur(radius=2)
      - Threshold at 140 (black/white)
      - Auto-crop via inverted getbbox() with 20px padding
      - Save PBM to clean/ dir
      - Run potrace: potrace -s -o {svg_path} --turdsize 20 --alphamax 1.0 --opttolerance 0.2 {pbm_path}
   c. If SVG created successfully, call Blender:
      blender --background --python /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/blender_extrude_render.py -- {svg_path} {name} /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/
   d. Log progress: "[N/total] name: vectorize OK, render OK" or error
5. At end, print summary: N succeeded, M failed, list failures
6. Add --dry-run flag that lists what would be processed without running
7. Add --vectorize-only flag that skips the Blender render step (useful for quick SVG batch)

Key details:
- Blender binary is at /opt/homebrew/bin/blender
- Use subprocess.run with capture_output=True for both potrace and blender
- Set timeout=300 (5 min) on Blender subprocess to prevent hangs on bad SVGs
- Write a simple log file: /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/batch_log.txt

After writing the script:
1. Run with --dry-run first to verify image detection and skip logic
2. Then kick off the full batch in background: nohup python3 batch_pipeline.py > batch_output.log 2>&1 &
  </action>
  <verify>
    <automated>cd /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos && python3 batch_pipeline.py --dry-run 2>&1 | head -20</automated>
  </verify>
  <done>batch_pipeline.py exists, --dry-run shows 67 images to process (skipping 3 done), and full batch is running in background</done>
</task>

<task type="auto">
  <name>Task 2: Add deity logo overlay to JARVIS App.tsx</name>
  <files>/Volumes/Extreme Pro/ACTIVE/jarvis/frontend/src/App.tsx</files>
  <action>
Add a deity/entity logo overlay system to App.tsx. This is a lightweight addition — NOT a full MediaDirector, just the spinning logo overlay triggered by deity name detection.

1. Add a DEITY_LOGOS map near the top constants (after the MODULES array ~line 90):
   Map deity/entity names to their MP4 filenames in the renders directory.
   Include the 3 completed logos first:
   ```
   const DEITY_LOGOS: Record<string, string> = {
     'zeus': 'zeus-lightning-turntable.mp4',
     'gorilla': 'gorilla-profile-turntable.mp4',
     'rosette': 'rosette-turntable.mp4',
     // Batch-rendered logos will be added as img-NNNN-turntable.mp4
     // TODO: expand mapping as logos are identified by deity name
   }
   ```
   The video files are served from /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/.
   For dev, use a LOGO_BASE_URL constant: 'http://localhost:5173/logos/' (Vite can proxy this)
   OR use file:// protocol if Electron, OR serve via the backend.
   Best approach: add a static file route. Check if JARVIS backend already serves static files.
   Fallback: use the renders path directly with a simple express.static or FastAPI StaticFiles mount.

2. Add state for active overlay:
   ```
   const [activeDeityLogo, setActiveDeityLogo] = useState<string | null>(null)
   const deityFadeTimerRef = useRef<NodeJS.Timeout | null>(null)
   ```

3. Add a detectDeity(text: string) function:
   - Lowercase the text
   - Check if any key from DEITY_LOGOS appears as a whole word (regex: \b{name}\b)
   - Return first match or null

4. Hook into the WebSocket onmessage handler (line ~299-310):
   - Add a new message type handler: if msg.type === 'chat' or msg.type === 'response' (whatever the chat system uses)
   - Call detectDeity(msg.text || msg.content || '')
   - If match found: setActiveDeityLogo(DEITY_LOGOS[match])
   - Clear any existing fade timer, set new one: setTimeout(() => setActiveDeityLogo(null), 8000) (8s display)

5. Add the overlay JSX — positioned absolute, centered, with opacity transition:
   Place this BEFORE the closing </div> of the main container:
   ```jsx
   {activeDeityLogo && (
     <div style={{
       position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
       display: 'flex', alignItems: 'center', justifyContent: 'center',
       pointerEvents: 'none', zIndex: 1000,
       animation: 'fadeInOut 8s ease-in-out forwards',
     }}>
       <video
         src={`${LOGO_BASE_URL}${activeDeityLogo}`}
         autoPlay loop muted playsInline
         style={{
           width: '300px', height: '300px',
           objectFit: 'contain', opacity: 0.85,
           filter: 'drop-shadow(0 0 20px rgba(0, 200, 255, 0.4))',
         }}
       />
     </div>
   )}
   ```

6. Add CSS keyframes for fadeInOut in the index.css file:
   ```css
   @keyframes fadeInOut {
     0% { opacity: 0; }
     10% { opacity: 1; }
     80% { opacity: 1; }
     100% { opacity: 0; }
   }
   ```

Keep it simple. No complex state machine. Video loops during display, fades out after 8 seconds. Deity detection is best-effort string matching — refinement comes later.
  </action>
  <verify>
    <automated>cd "/Volumes/Extreme Pro/ACTIVE/jarvis/frontend" && grep -c "DEITY_LOGOS\|activeDeityLogo\|detectDeity" src/App.tsx</automated>
  </verify>
  <done>App.tsx contains DEITY_LOGOS map, detectDeity function, activeDeityLogo state, and video overlay JSX. grep returns 3+ matches for the key identifiers.</done>
</task>

</tasks>

<verification>
1. batch_pipeline.py --dry-run lists ~67 images, skips zeus-lightning/gorilla-profile/rosette
2. Full batch is running in background (check: ps aux | grep batch_pipeline)
3. JARVIS App.tsx has deity overlay code (grep for DEITY_LOGOS, detectDeity, activeDeityLogo)
4. No TypeScript errors in App.tsx (if tsc available: npx tsc --noEmit)
</verification>

<success_criteria>
- batch_pipeline.py is a general-purpose script that processes any IMG_7*.JPG through vectorize+render
- Script is running in background, will produce ~67 new MP4 turntable renders over ~2 hours
- JARVIS App.tsx has a working deity logo overlay system ready for the rendered MP4s
- Phase 4 Oracle Engine noted as next step (out of scope for this quick task)
</success_criteria>

<output>
After completion, create `.planning/quick/260330-viw-batch-all-remaining-logos-through-3d-pip/260330-viw-SUMMARY.md`

Note for summary: Phase 4 Oracle Engine planning is the next step. Run `/gsd:plan-phase 4` in a fresh session.
</output>
