#!/bin/bash
# Strategic Intelligence Webhook Test Commands

echo "🧪 Strategic Intelligence Webhook Testing"
echo "======================================="

# Check if webhook is configured
if [ -z "$SLACK_STRATEGIC_WEBHOOK" ]; then
    echo "❌ Webhook not configured yet"
    echo ""
    echo "📋 TO CONFIGURE:"
    echo "1. Get webhook URL from Slack #strategic-intelligence channel setup"
    echo "2. Run: echo 'export SLACK_STRATEGIC_WEBHOOK="YOUR_WEBHOOK_URL"' >> ~/.zshrc"
    echo "3. Run: source ~/.zshrc"
    echo "4. Run this script again to test"
    echo ""
    echo "📖 Full instructions: ~/obsidian-vault/STRATEGIC_INTELLIGENCE_FINAL_ACTIVATION.md"
    exit 1
else
    echo "✅ Webhook configured: ${SLACK_STRATEGIC_WEBHOOK:0:50}..."
fi

# Test delivery
echo ""
echo "🚀 Testing strategic intelligence delivery..."
echo ""

~/scripts/deliver_to_slack.sh

echo ""
echo "✅ Test complete! Check your #strategic-intelligence Slack channel."
echo ""
echo "📅 Daily delivery schedule:"
echo "   7:30 AM: Generate strategic brief"
echo "   7:31 AM: Deliver to Slack #strategic-intelligence"
echo "   7:35 AM: Enhanced morning briefing"
echo "   Monday 8 AM: Weekly strategic analysis"
echo ""
echo "🎯 Strategic intelligence system operational!"
