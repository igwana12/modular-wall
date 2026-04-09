#!/bin/bash
# Enhanced Morning Briefing with African Tech Intelligence

VAULT="/Users/claw2501/obsidian-vault"
TODAY=$(date +%Y-%m-%d)
BRIEFING_FILE="$VAULT/MORNING_BRIEFINGS/${TODAY}_briefing.md"

echo "🌅 Generating Enhanced Morning Briefing - $(date +%B %d, %Y)"
echo "=================================================="

# Create briefing directory
mkdir -p "$VAULT/MORNING_BRIEFINGS"

# Initialize briefing
cat > "$BRIEFING_FILE" << EOF
# Morning Briefing - $(date +%B %d, %Y)

Generated at: $(date +%I:%M %p)

EOF

echo "📊 Gathering intelligence from all sources..."

# 1. Strategic Intelligence (from agent collaboration)
echo "## 🧠 Strategic Intelligence Highlights" >> "$BRIEFING_FILE"
echo "" >> "$BRIEFING_FILE"

STRATEGIC_BRIEF="$VAULT/STRATEGIC_INTELLIGENCE/daily_brief_$(date +%Y%m%d).md"
if [ -f "$STRATEGIC_BRIEF" ]; then
    echo "### Top Agent Discoveries" >> "$BRIEFING_FILE"
    grep -A5 "🔥 TOP INSIGHTS" "$STRATEGIC_BRIEF" 2>/dev/null | tail -5 >> "$BRIEFING_FILE"
    echo "" >> "$BRIEFING_FILE"
    
    echo "### Urgent CEO Decisions" >> "$BRIEFING_FILE"
    grep -A3 "⚠️ URGENT" "$STRATEGIC_BRIEF" 2>/dev/null | tail -3 >> "$BRIEFING_FILE"
    echo "" >> "$BRIEFING_FILE"
else
    echo "*Strategic intelligence brief pending - agents building collaboration data*" >> "$BRIEFING_FILE"
    echo "" >> "$BRIEFING_FILE"
fi

# 2. African Tech Intelligence (RSS feeds)
echo "## 🌍 African Tech Intelligence" >> "$BRIEFING_FILE"
echo "" >> "$BRIEFING_FILE"

# Scan for latest RSS articles
~/go/bin/blogwatcher scan >/dev/null 2>&1

echo "### Latest Tech News (Relevant to African Markets)" >> "$BRIEFING_FILE"
# Get recent articles and filter for African tech relevance
AFRICAN_TECH_NEWS=$(~/go/bin/blogwatcher articles 2>/dev/null | head -10 | grep -iE "(africa|nigeria|kenya|ghana|fintech|sendbox|cloudline|complete farmer|crypto|bitcoin)")

if [ -n "$AFRICAN_TECH_NEWS" ]; then
    echo "$AFRICAN_TECH_NEWS" | head -3 | while read -r line; do
        if [[ ! -z "$line" ]]; then
            echo "- $line" >> "$BRIEFING_FILE"
        fi
    done
else
    # Show top 2 latest articles regardless
    LATEST_NEWS=$(~/go/bin/blogwatcher articles 2>/dev/null | head -4 | tail -2)
    if [ -n "$LATEST_NEWS" ]; then
        echo "$LATEST_NEWS" | while read -r line; do
            if [[ ! -z "$line" ]]; then
                echo "- $line" >> "$BRIEFING_FILE"
            fi
        done
    else
        echo "- *Scanning RSS feeds for updates...*" >> "$BRIEFING_FILE"
    fi
fi
echo "" >> "$BRIEFING_FILE"

# 3. Calendar & Schedule
echo "## 📅 Today's Schedule" >> "$BRIEFING_FILE"
echo "" >> "$BRIEFING_FILE"

# Get today's calendar events
echo "### Scheduled Events" >> "$BRIEFING_FILE"
TODAY_ISO=$(date -u +%Y-%m-%dT%H:%M:%S.000Z)
TOMORROW_ISO=$(date -u -v +1d +%Y-%m-%dT%H:%M:%S.000Z 2>/dev/null || date -u -d '+1 day' +%Y-%m-%dT%H:%M:%S.000Z 2>/dev/null)

if command -v gws >/dev/null; then
    CALENDAR_EVENTS=$(gws calendar events list --params "{\"timeMin\": \"$TODAY_ISO\", \"timeMax\": \"$TOMORROW_ISO\", \"singleEvents\": true, \"orderBy\": \"startTime\"}" 2>/dev/null | head -5)
    
    if [ -n "$CALENDAR_EVENTS" ] && [ "$CALENDAR_EVENTS" != "[]" ]; then
        echo "$CALENDAR_EVENTS" >> "$BRIEFING_FILE"
    else
        echo "*No scheduled events for today*" >> "$BRIEFING_FILE"
    fi
else
    echo "*Calendar access not configured*" >> "$BRIEFING_FILE"
fi
echo "" >> "$BRIEFING_FILE"

# 4. Email Scan (Investment & Business Critical)
echo "## 📧 Email Intelligence" >> "$BRIEFING_FILE"
echo "" >> "$BRIEFING_FILE"

echo "### Recent Communications" >> "$BRIEFING_FILE"
if command -v gws >/dev/null; then
    # Get recent emails with investment keywords
    URGENT_EMAILS=$(gws gmail users messages list --params '{"userId": "me", "q": "is:unread (investment OR funding OR legal OR urgent OR ASAP OR timon OR Stream.ai OR sesame)", "maxResults": 3}' 2>/dev/null | head -3)
    
    if [ -n "$URGENT_EMAILS" ] && [ "$URGENT_EMAILS" != "[]" ]; then
        echo "$URGENT_EMAILS" >> "$BRIEFING_FILE"
    else
        echo "*No urgent emails detected*" >> "$BRIEFING_FILE"
    fi
else
    echo "*Email access not configured*" >> "$BRIEFING_FILE"
fi
echo "" >> "$BRIEFING_FILE"

# 5. Portfolio Intelligence
echo "## 💼 Portfolio & Markets" >> "$BRIEFING_FILE"
echo "" >> "$BRIEFING_FILE"

echo "### Timon Capital Portfolio" >> "$BRIEFING_FILE"
echo "- Monitor portfolio companies in African tech news" >> "$BRIEFING_FILE"
echo "- Track regulatory developments (Nigeria, Kenya)" >> "$BRIEFING_FILE"
echo "- Review follow-on investment opportunities" >> "$BRIEFING_FILE"
echo "" >> "$BRIEFING_FILE"

# 6. Action Items & Priorities
echo "## 🎯 Today's Priorities" >> "$BRIEFING_FILE"
echo "" >> "$BRIEFING_FILE"

echo "### From Strategic Intelligence" >> "$BRIEFING_FILE"
if [ -f "$STRATEGIC_BRIEF" ]; then
    grep -A3 "🚀 TODAY'S OPPORTUNITIES" "$STRATEGIC_BRIEF" 2>/dev/null | tail -3 >> "$BRIEFING_FILE"
else
    echo "- Review agent collaboration hubs in Obsidian" >> "$BRIEFING_FILE"
    echo "- Check strategic intelligence delivery pipeline" >> "$BRIEFING_FILE"
fi
echo "" >> "$BRIEFING_FILE"

echo "### African Tech Focus Areas" >> "$BRIEFING_FILE"
echo "- Monitor TechCabal for investment opportunities" >> "$BRIEFING_FILE"
echo "- Track The Flip podcast for ecosystem insights" >> "$BRIEFING_FILE"
echo "- Review portfolio company mentions in African tech news" >> "$BRIEFING_FILE"
echo "" >> "$BRIEFING_FILE"

# 7. Links & Resources
echo "## 🔗 Resources" >> "$BRIEFING_FILE"
echo "" >> "$BRIEFING_FILE"
echo "- **Strategic Intelligence:** [[$VAULT/AGENTS/Agent_Collaboration_Hub.md]]" >> "$BRIEFING_FILE"
echo "- **TechCabal RSS:** https://techcabal.com/tag/rss/" >> "$BRIEFING_FILE"
echo "- **The Flip Podcast:** https://feeds.transistor.fm/the-flip" >> "$BRIEFING_FILE"
if [ -f "$STRATEGIC_BRIEF" ]; then
    echo "- **Strategic Brief:** [[$STRATEGIC_BRIEF]]" >> "$BRIEFING_FILE"
fi
echo "" >> "$BRIEFING_FILE"

echo "---" >> "$BRIEFING_FILE"
echo "*Enhanced briefing: Strategic Intelligence + African Tech + Portfolio + Calendar*" >> "$BRIEFING_FILE"

echo "✅ Enhanced morning briefing created: $BRIEFING_FILE"

# Open the briefing
open "$BRIEFING_FILE"

# Return location for automation
echo "$BRIEFING_FILE"