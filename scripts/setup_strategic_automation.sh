#!/bin/bash
# Setup Strategic Intelligence Automation

echo "🤖 Setting up strategic intelligence automation..."

# Backup existing crontab
crontab -l > /tmp/crontab_backup_$(date +%Y%m%d) 2>/dev/null

# Add strategic intelligence automation to crontab
(crontab -l 2>/dev/null; cat << 'AUTOMATION'

# Strategic Intelligence Automation
# Daily strategic brief generation and delivery
30 7 * * * /Users/claw2501/scripts/generate_strategic_brief.sh >/dev/null 2>&1
31 7 * * * /Users/claw2501/scripts/deliver_to_slack.sh >/dev/null 2>&1

# Enhanced morning briefing with strategic intelligence
35 7 * * * /Users/claw2501/scripts/enhanced_morning_briefing.sh >/dev/null 2>&1

# Weekly strategic analysis  
0 8 * * 1 /Users/claw2501/scripts/weekly_strategic_analysis.sh >/dev/null 2>&1

AUTOMATION
) | crontab -

echo "✅ Strategic intelligence automation scheduled:"
echo "   7:30 AM: Generate daily strategic brief"
echo "   7:31 AM: Deliver to Slack #strategic-intelligence" 
echo "   7:35 AM: Enhanced morning briefing"
echo "   Monday 8 AM: Weekly strategic analysis"

echo "📋 View scheduled jobs: crontab -l"
