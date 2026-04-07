#!/bin/bash
# Test Strategic Intelligence System

echo "🧪 Testing Strategic Intelligence System"
echo "======================================"

# Test 1: Generate sample strategic brief
echo "1. Generating sample strategic brief..."
VAULT="/Users/claw2501/obsidian-vault"
SAMPLE_BRIEF="$VAULT/STRATEGIC_INTELLIGENCE/DAILY_BRIEFS/$(date +%Y-%m-%d)_Brief.md"

# Copy sample data for testing
if [ -f "$VAULT/DAILY_STRATEGIC_BRIEFS/SAMPLE_Strategic_Brief_2026-04-07.md" ]; then
    cp "$VAULT/DAILY_STRATEGIC_BRIEFS/SAMPLE_Strategic_Brief_2026-04-07.md" "$SAMPLE_BRIEF"
    echo "✅ Sample strategic brief ready"
else
    echo "⚠️  No sample brief found - creating minimal test brief"
    
    cat > "$SAMPLE_BRIEF" << 'TEST_BRIEF'
# Daily Strategic Intelligence - $(date +%Y-%m-%d)

## 🔥 Top Strategic Insights
**Test Mode:** Strategic intelligence system is operational and ready for agent data.

## 🎯 Decisions Requiring CEO Attention  
**System Setup:** Complete Slack webhook configuration to receive strategic intelligence.

## 📈 Goal Acceleration Opportunities
**Agent Deployment:** Deploy collaborative agent system to begin strategic intelligence generation.

---
*Test brief - real intelligence will be generated from agent collaboration*
TEST_BRIEF

    echo "✅ Test brief created"
fi

# Test 2: Check delivery script
echo ""
echo "2. Testing delivery system..."
if [ -f "/Users/claw2501/scripts/deliver_to_slack.sh" ]; then
    echo "✅ Delivery script ready"
    echo "   Run: ~/scripts/deliver_to_slack.sh (after webhook setup)"
else
    echo "❌ Delivery script missing"
fi

# Test 3: Check automation setup
echo ""
echo "3. Automation setup..."
if [ -f "/Users/claw2501/scripts/setup_strategic_automation.sh" ]; then
    echo "✅ Automation script ready"
    echo "   Run: ~/scripts/setup_strategic_automation.sh (to schedule automation)"
else
    echo "❌ Automation script missing"
fi

# Test 4: Directory structure
echo ""
echo "4. Directory structure..."
if [ -d "$VAULT/STRATEGIC_INTELLIGENCE" ]; then
    echo "✅ Strategic intelligence directories ready"
    echo "   Location: $VAULT/STRATEGIC_INTELLIGENCE/"
else
    echo "❌ Strategic intelligence directories missing"
fi

echo ""
echo "🎯 NEXT STEPS:"
echo "1. Create Slack #strategic-intelligence channel"
echo "2. Get webhook URL and set SLACK_STRATEGIC_WEBHOOK environment variable"
echo "3. Run: ~/scripts/test_strategic_system.sh"
echo "4. Run: ~/scripts/setup_strategic_automation.sh"
echo "5. Deploy collaborative agent system"
echo ""
echo "📋 Setup guide: ~/obsidian-vault/STRATEGIC_INTELLIGENCE/SLACK_WEBHOOK_SETUP.md"
