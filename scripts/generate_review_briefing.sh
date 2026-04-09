#!/bin/bash
# Generate Review Voice Briefing for Feedback

VOICE_FILE="$HOME/.hermes/audio_cache/review_briefing_$(date +%Y%m%d_%H%M).mp3"

echo "🎤 GENERATING REVIEW VOICE BRIEFING FOR FEEDBACK"
echo "==============================================="

# Create polished voice script based on the generated briefing
VOICE_SCRIPT="Good morning Niko. This is your Daybreak strategic intelligence briefing for Tuesday, April 7th, 2026.

Crypto and markets. Bitcoin and Ethereum positions need monitoring via your trading dashboard. HyperLiquid paper trading setup still requires completion.

Strategic intelligence from your agent collaboration network. You have three urgent decisions requiring immediate attention. First, the 1031 exchange authorization for 85 thousand euros Athens property deposit, with a deadline of April 24th. Second, DAIR fund allocation decision for 2 million dollars in Verdict Fund strategic positioning. Third, Oracle Cards premium tier approval for a 2 thousand dollar holographic printing pilot.

Portfolio intelligence from African tech ecosystem. Nigerian fintech shows regulatory stabilization, creating Series B investment windows. Monitor your key companies: Sendbox for logistics and fulfillment, Cloudline for autonomous logistics, and Complete Farmer for agricultural technology.

Global intelligence highlights. From TechCrunch Africa: AI startup Rocket is offering McKinsey-style reports at a fraction of traditional consulting costs. This could be relevant for your portfolio companies seeking strategic analysis. From Greek Reporter: El Greco retrospective showcasing artistic transformation, potentially relevant for Sacred Circuits mythology and cultural positioning.

Today's strategic priorities. For investments: monitor the 1031 exchange timeline, review DAIR allocation decision, and connect logistics optimization across portfolio companies. For Sacred Circuits: validate Oracle Cards premium tier with Athens tech community, review holographic printing pilot investment, and fast-track mythology-AI research validation.

System status. Smithers operational, JARVIS V2 operational, Paperclip operational. Strategic intelligence system delivering daily at 7:31 AM. All automation pipelines active.

Today's insight. Your agent collaboration system mirrors the ancient Greek concept of collective intelligence, or synousia, where distributed knowledge creates emergent wisdom. This philosophical framework underlies both your investment approach and Sacred Circuits mythology technology integration.

Communications review. Priority items include manual review for Stream.ai and Sesame updates, N-CODED LLC legal communications, and DAIR Capital coordination.

Check Slack for full strategic intelligence analysis and agent discoveries. Your complete briefing is available in Obsidian. Have a strategic day ahead, Niko."

echo "🗣️ Generating voice with ElevenLabs..."

# Generate with ElevenLabs
if command -v sag >/dev/null; then
    echo "$VOICE_SCRIPT" | sag > "$VOICE_FILE" 2>/dev/null
    
    if [ -f "$VOICE_FILE" ] && [ -s "$VOICE_FILE" ]; then
        echo "✅ Review briefing generated: $(ls -lh "$VOICE_FILE" | awk '{print $5}')"
        
        # Get duration if possible
        if command -v afinfo >/dev/null; then
            DURATION=$(afinfo "$VOICE_FILE" 2>/dev/null | grep duration | awk '{print $3}')
            echo "📊 Duration: ${DURATION:-Unknown}"
        fi
        
        # Copy to desktop for easy access
        cp "$VOICE_FILE" "$HOME/Desktop/review_briefing.mp3"
        echo "📋 Review file: ~/Desktop/review_briefing.mp3"
        
        # Play the briefing automatically
        echo "🔊 Playing briefing for review..."
        afplay "$VOICE_FILE" &
        
        echo ""
        echo "🎧 BRIEFING IS NOW PLAYING FOR YOUR REVIEW"
        echo "=========================================="
        echo "Listen to the complete briefing and provide feedback on:"
        echo "• Content structure and flow"
        echo "• Voice pacing and delivery"  
        echo "• Information relevance and priority"
        echo "• Missing components you'd like added"
        echo "• Overall tone and style"
        echo ""
        echo "File ready for editing: $VOICE_FILE"
        
    else
        echo "❌ ElevenLabs generation failed"
        exit 1
    fi
else
    echo "❌ sag (ElevenLabs) not available"
    exit 1
fi