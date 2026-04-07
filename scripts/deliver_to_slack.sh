#!/bin/bash
# Strategic Intelligence Slack Delivery

VAULT="/Users/claw2501/obsidian-vault"
BRIEF_FILE="$VAULT/STRATEGIC_INTELLIGENCE/DAILY_BRIEFS/$(date +%Y-%m-%d)_Brief.md"

# Check if brief exists
if [ ! -f "$BRIEF_FILE" ]; then
    echo "No strategic brief found for today"
    exit 1
fi

# Extract key sections (simplified for macOS)
TOP_INSIGHTS=$(grep -A10 "Top Strategic Insights" "$BRIEF_FILE" 2>/dev/null | head -10 | sed 's/^/• /')
URGENT_DECISIONS=$(grep -A5 "Decisions Requiring CEO Attention" "$BRIEF_FILE" 2>/dev/null | head -5 | sed 's/^/• /')
OPPORTUNITIES=$(grep -A5 "Goal Acceleration Opportunities" "$BRIEF_FILE" 2>/dev/null | head -5 | sed 's/^/• /')

# Create Slack message
SLACK_MESSAGE="🧠 **Daily Strategic Intelligence - $(date +%B %d)**

🔥 **TOP INSIGHTS:**
$TOP_INSIGHTS

⚠️ **URGENT DECISIONS:**
$URGENT_DECISIONS

🚀 **TODAY'S OPPORTUNITIES:**
$OPPORTUNITIES

📊 Full analysis in Obsidian: $BRIEF_FILE
💬 Discuss in thread below"

# For now, just echo the message (replace with actual Slack webhook when ready)
echo "Strategic Intelligence Slack Message:"
echo "=================================="
echo "$SLACK_MESSAGE"
echo "=================================="
echo ""
echo "To integrate with Slack, add webhook URL and uncomment the curl command below:"
echo "# curl -X POST -H 'Content-type: application/json' --data '{"text":"$SLACK_MESSAGE"}' YOUR_SLACK_WEBHOOK_URL"
