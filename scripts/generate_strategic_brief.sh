#!/bin/bash
# Strategic Intelligence Daily Brief Generator

VAULT="/Users/claw2501/obsidian-vault"
BRIEF_DATE=$(date +%Y-%m-%d)
BRIEF_FILE="$VAULT/DAILY_STRATEGIC_BRIEFS/Strategic_Brief_$BRIEF_DATE.md"

echo "# Daily Strategic Intelligence - $BRIEF_DATE" > "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"
echo "*Auto-generated from agent collaboration data*" >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

# 1. TOP STRATEGIC INSIGHTS (Last 24 Hours)
echo "## 🔥 Top Strategic Insights" >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

echo "### Sacred Circuits Discoveries" >> "$BRIEF_FILE"
grep -r -A2 -B1 "breakthrough\|discovery\|innovation\|opportunity" "$VAULT/AGENTS/SACRED_CIRCUITS" --include="*.md" 2>/dev/null | grep -E "($(date +%Y-%m-%d)|$(date -d 'yesterday' +%Y-%m-%d))" | head -3 >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

echo "### Investment Intelligence" >> "$BRIEF_FILE"
grep -r -A2 -B1 "deal\|investment\|opportunity\|market\|portfolio" "$VAULT/AGENTS/TIMON_CAPITAL" --include="*.md" 2>/dev/null | grep -E "($(date +%Y-%m-%d)|$(date -d 'yesterday' +%Y-%m-%d))" | head -3 >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

echo "### Family Office Intelligence" >> "$BRIEF_FILE"
grep -r -A2 -B1 "opportunity\|investment\|property\|decision" "$VAULT/AGENTS/FAMILY_OFFICE" --include="*.md" 2>/dev/null | grep -E "($(date +%Y-%m-%d)|$(date -d 'yesterday' +%Y-%m-%d))" | head -3 >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

# 2. CROSS-AGENT COLLABORATION INSIGHTS
echo "## 💡 Cross-Agent Collaboration Insights" >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

# Find recent @mentions indicating collaboration
grep -r "@" "$VAULT/AGENTS/SHARED_NOTES" --include="*.md" 2>/dev/null | grep -E "($(date +%Y-%m-%d)|$(date -d 'yesterday' +%Y-%m-%d))" | head -5 >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

# 3. STRATEGIC RISKS & EARLY WARNINGS
echo "## ⚠️ Strategic Risks & Early Warnings" >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

grep -r -A2 -B1 "risk\|threat\|concern\|problem\|blocked\|deadline" "$VAULT/AGENTS" --include="*.md" 2>/dev/null | grep -E "($(date +%Y-%m-%d)|$(date -d 'yesterday' +%Y-%m-%d))" | head -3 >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

# 4. GOAL ACCELERATION OPPORTUNITIES
echo "## 📈 Goal Acceleration Opportunities" >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

grep -r -A2 -B1 "accelerate\|optimize\|improve\|faster\|efficiency" "$VAULT/AGENTS" --include="*.md" 2>/dev/null | grep -E "($(date +%Y-%m-%d)|$(date -d 'yesterday' +%Y-%m-%d))" | head -5 >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

# 5. DECISIONS REQUIRING CEO ATTENTION
echo "## 🎯 Decisions Requiring CEO Attention" >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

grep -r -A3 -B1 "decision\|escalate\|CEO\|Niko\|strategic" "$VAULT/AGENTS" --include="*.md" 2>/dev/null | grep -E "($(date +%Y-%m-%d)|$(date -d 'yesterday' +%Y-%m-%d))" | head -3 >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

# 6. TOP COLLABORATING AGENTS
echo "## 🏆 Most Active Collaborating Agents" >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

# Count recent activity by agents
grep -r -E "($(date +%Y-%m-%d)|$(date -d 'yesterday' +%Y-%m-%d))" "$VAULT/AGENTS" --include="*.md" 2>/dev/null | grep -o "Agent: [^,]*" | sort | uniq -c | sort -nr | head -5 >> "$BRIEF_FILE"
echo "" >> "$BRIEF_FILE"

echo "---" >> "$BRIEF_FILE"
echo "*Generated: $(date)*" >> "$BRIEF_FILE"
echo "*Review full agent activity: [[AGENTS/Agent Collaboration Hub]]*" >> "$BRIEF_FILE"
echo "*Strategic implementation tracking: [[STRATEGIC_IMPLEMENTATION/Implementation_Tracking]]*" >> "$BRIEF_FILE"

echo "Daily strategic brief generated: $BRIEF_FILE"

# Notify that brief is ready (could send to Slack, email, etc.)
echo "📊 Strategic Intelligence Brief Ready: $(date)" > /tmp/strategic_brief_notification.txt
