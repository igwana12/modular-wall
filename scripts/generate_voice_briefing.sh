#!/bin/bash
# Generate Voice Morning Briefing for Alexa

VAULT="/Users/claw2501/obsidian-vault"
TODAY=$(date +%Y-%m-%d)
BRIEFING_FILE="$VAULT/MORNING_BRIEFINGS/${TODAY}_briefing.md"
VOICE_FILE="$HOME/.hermes/audio_cache/morning_briefing_${TODAY}.mp3"

echo "🗣️ Generating Voice Morning Briefing for Alexa"
echo "=============================================="

# Step 1: Generate the text briefing if it doesn't exist
if [ ! -f "$BRIEFING_FILE" ]; then
    echo "📝 Generating text briefing first..."
    /Users/claw2501/scripts/enhanced_morning_briefing_fixed.sh >/dev/null
fi

# Step 2: Create voice-optimized script
VOICE_SCRIPT="Good morning Niko. Here is your strategic intelligence briefing for $(date '+%B %d, %Y').

From your agent collaboration network: Oracle Cards research shows 3x pricing potential for holographic versions. Nigerian fintech regulation is stabilizing, creating Series B opportunities. Your Athens property network provides tech entrepreneur access for both deal flow and product testing.

Urgent decisions today: The 1031 exchange requires 85 thousand euro deposit authorization by April 24th. DAIR Capital Verdict Fund allocation needs your 2 million dollar decision.

African tech focus: TechCabal is reporting increased fintech investment activity. The Flip podcast indicates positive ecosystem sentiment. Monitor your portfolio companies for cross-expansion opportunities.

Strategic priorities: Connect logistics optimization across your three investments. Fast-track Sacred Circuits research validation for LP showcase. Leverage Athens tech community for Oracle Cards premium tier validation.

Your agent network has generated strategic intelligence. Check Slack for full analysis. Have a strategic day ahead."

# Step 3: Generate voice file using ElevenLabs sag
echo "🎤 Generating voice file with ElevenLabs..."

# Generate with sag (ElevenLabs)
if command -v sag >/dev/null; then
    echo "$VOICE_SCRIPT" | sag > "$VOICE_FILE" 2>/dev/null
    
    if [ -f "$VOICE_FILE" ] && [ -s "$VOICE_FILE" ]; then
        echo "✅ Voice briefing generated with ElevenLabs: $VOICE_FILE"
        
        # Get file size for verification
        VOICE_SIZE=$(ls -lh "$VOICE_FILE" | awk '{print $5}')
        echo "📊 Voice file size: $VOICE_SIZE"
        
    else
        echo "❌ ElevenLabs failed, using macOS say as fallback..."
        say "$VOICE_SCRIPT" --output-file="${VOICE_FILE%.mp3}.aiff"
        # Convert to MP3 if needed
        if command -v ffmpeg >/dev/null; then
            ffmpeg -i "${VOICE_FILE%.mp3}.aiff" "$VOICE_FILE" -y >/dev/null 2>&1
            rm "${VOICE_FILE%.mp3}.aiff"
        else
            mv "${VOICE_FILE%.mp3}.aiff" "$VOICE_FILE"
        fi
    fi
else
    echo "🍎 Using macOS say for voice generation..."
    say "$VOICE_SCRIPT" --output-file="${VOICE_FILE%.mp3}.aiff"
    mv "${VOICE_FILE%.mp3}.aiff" "$VOICE_FILE"
fi

# Step 4: Verify and prepare for Alexa
if [ -f "$VOICE_FILE" ] && [ -s "$VOICE_FILE" ]; then
    echo "✅ Morning voice briefing ready for Alexa: $VOICE_FILE"
    
    # Copy to easily accessible location for iOS Shortcuts
    mkdir -p "$HOME/Desktop/alexa-briefings"
    cp "$VOICE_FILE" "$HOME/Desktop/alexa-briefings/morning_briefing_latest.mp3"
    cp "$VOICE_FILE" "$HOME/Desktop/morning_briefing_latest.mp3"
    
    echo "📋 Ready for iOS Shortcuts: ~/Desktop/morning_briefing_latest.mp3"
    echo "📁 Archive location: ~/Desktop/alexa-briefings/"
    
    # Open the audio file to verify
    open "$VOICE_FILE"
    
    echo "$VOICE_FILE"
else
    echo "❌ Voice file generation failed"
    exit 1
fi