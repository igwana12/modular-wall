#!/bin/bash
# Final Strategic Intelligence Setup Commands

echo "🚀 Strategic Intelligence Final Setup"
echo "===================================="

echo ""
echo "1. Create Slack #strategic-intelligence channel (manual)"
echo "2. Get webhook URL from Slack (manual)"
echo "3. Configure webhook environment variable:"
echo ""
echo "   REPLACE THE URL BELOW WITH YOUR ACTUAL WEBHOOK:"
echo '   echo '"'"'export SLACK_STRATEGIC_WEBHOOK="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"'"'"' >> ~/.zshrc'
echo "   source ~/.zshrc"
echo ""
echo "4. Test the delivery system:"
echo "   ~/scripts/deliver_to_slack.sh"
echo ""
echo "5. Schedule daily automation:"  
echo "   ~/scripts/setup_strategic_automation.sh"
echo ""
echo "✅ RESULT: Strategic intelligence delivered daily at 7:31 AM to Slack"
echo "✅ Enhanced morning briefing includes strategic highlights"
echo "✅ Mobile access: 'Hey Siri, strategic intelligence'"
echo ""
echo "🔄 Next: Deploy collaborative agent system to start generating intelligence"
