#!/bin/bash
# Strategic Intelligence Slack Delivery - Production Ready

VAULT="/Users/claw2501/obsidian-vault"
BRIEF_FILE="$VAULT/STRATEGIC_INTELLIGENCE/DAILY_BRIEFS/$(date +%Y-%m-%d)_Brief.md"

# Check if webhook URL is configured
if [ -z "$SLACK_STRATEGIC_WEBHOOK" ]; then
    echo "⚠️  Slack webhook URL not configured. Please set SLACK_STRATEGIC_WEBHOOK environment variable."
    echo "📋 Setup instructions: ~/obsidian-vault/STRATEGIC_INTELLIGENCE/SLACK_WEBHOOK_SETUP.md"
    exit 1
fi

# Check if brief exists
if [ ! -f "$BRIEF_FILE" ]; then
    echo "📝 No strategic brief found for today - generating from agent data..."
    
    # Try to generate brief first
    if [ -f "/Users/claw2501/scripts/generate_strategic_brief.sh" ]; then
        /Users/claw2501/scripts/generate_strategic_brief.sh
    fi
    
    # Check again
    if [ ! -f "$BRIEF_FILE" ]; then
        echo "❌ No strategic brief available - agents may not have collaboration data yet"
        
        # Send notification that system is ready but waiting for agent data
        curl -X POST -H 'Content-type: application/json'              --data '{"text":"🤖 Strategic Intelligence System Online

📊 Daily strategic brief will be generated once agents begin collaborating.
⏰ Expected first brief: Tomorrow 7:30 AM
📋 System status: Ready and monitoring agent activity"}'              "$SLACK_STRATEGIC_WEBHOOK"
        
        exit 0
    fi
fi

# Extract key sections (macOS-compatible)
TOP_INSIGHTS=$(sed -n '/🔥.*Top Strategic Insights/,/##/p' "$BRIEF_FILE" | head -10 | grep -v "^##" | sed 's/^/• /')
URGENT_DECISIONS=$(sed -n '/🎯.*Decisions Requiring CEO Attention/,/##/p' "$BRIEF_FILE" | head -5 | grep -v "^##" | sed 's/^/• /')
OPPORTUNITIES=$(sed -n '/📈.*Goal Acceleration Opportunities/,/##/p' "$BRIEF_FILE" | head -5 | grep -v "^##" | sed 's/^/• /')

# Create formatted Slack message
SLACK_MESSAGE="🧠 **Daily Strategic Intelligence - $(date +"%B %d")**

🔥 **TOP INSIGHTS:**
$TOP_INSIGHTS

⚠️ **URGENT DECISIONS:**
$URGENT_DECISIONS

🚀 **TODAY'S OPPORTUNITIES:**
$OPPORTUNITIES

📊 Full analysis: obsidian://open?vault=obsidian-vault&file=STRATEGIC_INTELLIGENCE/DAILY_BRIEFS/$(date +%Y-%m-%d)_Brief.md
💬 Discuss strategic actions in thread below"

# Send to Slack
curl -X POST -H 'Content-type: application/json'      --data "{"text":"$SLACK_MESSAGE"}"      "$SLACK_STRATEGIC_WEBHOOK"

if [ $? -eq 0 ]; then
    echo "✅ Strategic intelligence delivered to Slack #strategic-intelligence"
else
    echo "❌ Failed to deliver to Slack - check webhook URL and network connection"
    exit 1
fi
