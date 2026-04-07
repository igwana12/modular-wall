#!/bin/bash
# Strategic Intelligence Weekly Analysis Generator

VAULT="/Users/claw2501/obsidian-vault"
WEEK_START=$(date -d 'last monday' +%Y-%m-%d)
ANALYSIS_FILE="$VAULT/WEEKLY_STRATEGIC_ANALYSIS/Strategic_Analysis_$WEEK_START.md"

echo "# Weekly Strategic Analysis - Week of $WEEK_START" > "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"
echo "*7-day synthesis of agent collaboration intelligence*" >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

# 1. INNOVATION PATTERNS
echo "## 🧠 Innovation & Opportunity Patterns" >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

echo "### Technology-Business Fusion" >> "$ANALYSIS_FILE"
grep -r -A2 -B1 "technology.*business\|technical.*market\|innovation.*opportunity" "$VAULT/AGENTS" --include="*.md" 2>/dev/null | tail -5 >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

echo "### Cross-Company Synergies" >> "$ANALYSIS_FILE"
# Find mentions of one company in another company's notes
grep -r "Sacred Circuits" "$VAULT/AGENTS/TIMON_CAPITAL" --include="*.md" 2>/dev/null | head -3 >> "$ANALYSIS_FILE"
grep -r "Timon Capital" "$VAULT/AGENTS/SACRED_CIRCUITS" --include="*.md" 2>/dev/null | head -3 >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

# 2. COMPETITIVE ADVANTAGE INSIGHTS
echo "## 🏆 Competitive Advantage Insights" >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

grep -r -A2 -B1 "advantage\|unique\|differentiator\|competitive\|edge" "$VAULT/AGENTS" --include="*.md" 2>/dev/null | tail -5 >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

# 3. RESOURCE OPTIMIZATION OPPORTUNITIES
echo "## ⚡ Resource Optimization Opportunities" >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

grep -r -A2 -B1 "efficiency\|optimize\|streamline\|automate\|cost.*reduction" "$VAULT/AGENTS" --include="*.md" 2>/dev/null | tail -5 >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

# 4. STRATEGIC RISKS ANALYSIS
echo "## 🚨 Strategic Risk Analysis" >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

grep -r -A2 -B1 "risk\|threat\|challenge\|vulnerability\|dependency" "$VAULT/AGENTS" --include="*.md" 2>/dev/null | tail -5 >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

# 5. GOAL ACCELERATION MATRIX
echo "## 🎯 Goal Acceleration Matrix" >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

echo "### The Orb Project Acceleration" >> "$ANALYSIS_FILE"
grep -r -A2 -B1 "Oracle.*Cards\|Spirit.*Sphere\|JARVIS\|The.*Orb" "$VAULT/AGENTS" --include="*.md" 2>/dev/null | grep -E "(accelerate|faster|optimize)" | tail -3 >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

echo "### Investment Portfolio Acceleration" >> "$ANALYSIS_FILE"
grep -r -A2 -B1 "portfolio\|investment\|deal.*flow" "$VAULT/AGENTS" --include="*.md" 2>/dev/null | grep -E "(accelerate|faster|optimize)" | tail -3 >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

# 6. STRATEGIC RECOMMENDATIONS
echo "## 📋 Strategic Recommendations" >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

echo "### High-Impact, Low-Effort (Do Immediately)" >> "$ANALYSIS_FILE"
grep -r -A2 -B1 "quick.*win\|easy.*implementation\|low.*effort" "$VAULT/AGENTS" --include="*.md" 2>/dev/null | tail -3 >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

echo "### Strategic Investment Opportunities" >> "$ANALYSIS_FILE"
grep -r -A2 -B1 "strategic.*investment\|major.*opportunity\|significant.*potential" "$VAULT/AGENTS" --include="*.md" 2>/dev/null | tail -3 >> "$ANALYSIS_FILE"
echo "" >> "$ANALYSIS_FILE"

echo "---" >> "$ANALYSIS_FILE"
echo "*Generated: $(date)*" >> "$ANALYSIS_FILE"
echo "*Based on 7 days of agent collaboration data*" >> "$ANALYSIS_FILE"

echo "Weekly strategic analysis generated: $ANALYSIS_FILE"
