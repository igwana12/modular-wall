#!/bin/bash
# Voice Morning Briefing with Ambient Sound for Alexa

VAULT="/Users/claw2501/obsidian-vault"
TODAY=$(date +%Y-%m-%d)
BRIEFING_FILE="$VAULT/MORNING_BRIEFINGS/${TODAY}_daybreak_briefing.md"
VOICE_FILE="$HOME/.hermes/audio_cache/daybreak_briefing_${TODAY}.mp3"
FINAL_VOICE_FILE="$HOME/.hermes/audio_cache/daybreak_with_ambient_${TODAY}.mp3"

echo "🎵 GENERATING VOICE BRIEFING WITH AMBIENT SOUND FOR ALEXA"
echo "========================================================"

# Step 1: Generate text briefing if needed
if [ ! -f "$BRIEFING_FILE" ]; then
    echo "📝 Generating daybreak briefing first..."
    /Users/claw2501/scripts/complete_daybreak_briefing.sh >/dev/null
fi

# Step 2: Create voice-optimized script from briefing
 echo "📋 Creating voice script from daybreak briefing..."
 
 extract_section() {
     local section="$1"
     awk -v section="$section" '
         $0 ~ section {flag=1; next}
         flag && /^## / {flag=0}
         flag {print}
     ' "$BRIEFING_FILE" | sed -E 's/^#+[[:space:]]*//; s/^•[[:space:]]*//; s/^-[[:space:]]*//; s/\*\*//g; s/\*//g' | grep -v '^[[:space:]]*$' | head -8
 }
 
 if [ -f "$BRIEFING_FILE" ]; then
     CRYPTO_SECTION=$(extract_section "## 💰 CRYPTO & MARKETS")
     STRATEGIC_SECTION=$(extract_section "## 🧠 Strategic Intelligence")
     CALENDAR_SECTION=$(extract_section "## 📅 Today's Schedule")
     PORTFOLIO_SECTION=$(extract_section "## 💼 Portfolio Intelligence")
     GLOBAL_SECTION=$(extract_section "## 🌍 Global Intelligence")
     COMMS_SECTION=$(extract_section "## 📧 Communications Review")
     SYSTEM_SECTION=$(extract_section "## ⚙️ System Status")
     PRIORITIES_SECTION=$(extract_section "## 🎯 Strategic Priorities")
     INSIGHT_LINE=$(grep "Strategic Perspective:" "$BRIEFING_FILE" | sed 's/.*Strategic Perspective:[[:space:]]*//' | head -1)
 else
     CRYPTO_SECTION=""
     STRATEGIC_SECTION=""
     CALENDAR_SECTION=""
     PORTFOLIO_SECTION=""
     GLOBAL_SECTION=""
     COMMS_SECTION=""
     SYSTEM_SECTION=""
     PRIORITIES_SECTION=""
     INSIGHT_LINE=""
 fi
 
 VOICE_SCRIPT="Good morning Niko. It’s Daybreak — your calm, coaching map of the day for $(date +'%A, %B %d, %Y').
 
Markets first: ${CRYPTO_SECTION}.
 
Strategic intelligence — the patterns worth your attention: ${STRATEGIC_SECTION}.
 
Your schedule and focus windows: ${CALENDAR_SECTION}.
 
Portfolio intelligence: ${PORTFOLIO_SECTION}.
 
Global signals: ${GLOBAL_SECTION}.
 
Communications review: ${COMMS_SECTION}.
 
System status: ${SYSTEM_SECTION}.
 
Strategic priorities: ${PRIORITIES_SECTION}.
 
And one perspective to carry with you: ${INSIGHT_LINE}.
 
That’s Daybreak. You’ve got the map — now move with clarity."


# Step 3: Generate voice file using ElevenLabs
 echo "🎤 Generating voice with ElevenLabs..."
 
 # Load ElevenLabs API key if available
 if [ -f "/Users/claw2501/services/orb-backend/.env" ]; then
     export ELEVENLABS_API_KEY=$(grep '^ELEVENLABS_API_KEY=' /Users/claw2501/services/orb-backend/.env | cut -d'=' -f2)
 fi
 
 if command -v sag >/dev/null; then
     # Write script to temp file to avoid shell escaping issues
     VOICE_SCRIPT_FILE="/tmp/daybreak_voice_script_${TODAY}.txt"
     echo "$VOICE_SCRIPT" > "$VOICE_SCRIPT_FILE"
     
     # Charlie voice + Daybreak pacing
sag speak -v Charlie --model-id eleven_v3 --stability 0.5 --similarity 0.7 --speed 1.05 \
        --input-file "$VOICE_SCRIPT_FILE" --output "$VOICE_FILE" 2>/tmp/daybreak_sag_error.log
    
     if [ -f "$VOICE_FILE" ] && [ -s "$VOICE_FILE" ] && [ $(stat -f%z "$VOICE_FILE") -gt 50000 ]; then
         echo "✅ Voice briefing generated: $(ls -lh "$VOICE_FILE" | awk '{print $5}')"
     else
         echo "❌ ElevenLabs failed, using macOS say..."
         if [ -s /tmp/daybreak_sag_error.log ]; then
             echo "⚠️ ElevenLabs error:"; cat /tmp/daybreak_sag_error.log
         fi
         say "$VOICE_SCRIPT" --output-file="${VOICE_FILE%.mp3}.aiff"
         if command -v ffmpeg >/dev/null; then
             ffmpeg -i "${VOICE_FILE%.mp3}.aiff" "$VOICE_FILE" -y >/dev/null 2>&1
             rm "${VOICE_FILE%.mp3}.aiff"
         else
             mv "${VOICE_FILE%.mp3}.aiff" "$VOICE_FILE"
         fi
     fi
 else
     echo "🍎 Using macOS say..."
     say "$VOICE_SCRIPT" --output-file="$VOICE_FILE"
 fi

# Step 4: Add ambient sound (optional - can integrate with Pantheon sound system)
echo "🎵 Adding ambient sound layer..."

# For now, just copy the voice file (ambient integration can be added later)
cp "$VOICE_FILE" "$FINAL_VOICE_FILE"

# Step 5: Prepare for Alexa integration
if [ -f "$FINAL_VOICE_FILE" ] && [ -s "$FINAL_VOICE_FILE" ]; then
    echo "✅ Alexa-ready briefing: $FINAL_VOICE_FILE"
    
    # Copy to accessible locations
    mkdir -p "$HOME/Desktop/alexa-briefings"
    cp "$FINAL_VOICE_FILE" "$HOME/Desktop/alexa-briefings/daybreak_latest.mp3"
    cp "$FINAL_VOICE_FILE" "$HOME/Desktop/daybreak_briefing.mp3"
    
    # Get duration
    if command -v afinfo >/dev/null; then
        DURATION=$(afinfo "$FINAL_VOICE_FILE" 2>/dev/null | grep duration | awk '{print $3}')
        echo "📊 Briefing duration: ${DURATION:-Unknown}"
    fi
    
    echo "📋 Alexa shortcuts ready: ~/Desktop/daybreak_briefing.mp3"
    echo "📁 Archive: ~/Desktop/alexa-briefings/daybreak_latest.mp3"
    
    # Open for verification
    open "$FINAL_VOICE_FILE"
    
    echo "$FINAL_VOICE_FILE"
else
    echo "❌ Voice briefing generation failed"
    exit 1
fi

echo ""
echo "🚨 NEXT: Set up iOS Shortcut for 8:00 AM Alexa alarm with this audio file"