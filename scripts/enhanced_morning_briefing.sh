#!/bin/bash
# Enhanced Morning Briefing with Strategic Intelligence

VAULT="/Users/claw2501/obsidian-vault"
TODAY=$(date +%Y-%m-%d)
BRIEF_FILE="$VAULT/STRATEGIC_INTELLIGENCE/DAILY_BRIEFS/${TODAY}_Brief.md"
OUTPUT_FILE="$VAULT/DAILY/${TODAY}_Enhanced_Briefing.md"

# Create enhanced briefing
cat > "$OUTPUT_FILE" << EOF
# Enhanced Morning Briefing - $(date +%B %d, %Y)

## 🧠 Strategic Intelligence Highlights

EOF

# Extract top 3 strategic items if brief exists
if [ -f "$BRIEF_FILE" ]; then
    echo "### Agent Discoveries (Last 24 Hours)" >> "$OUTPUT_FILE"
    grep -A15 "Top Strategic Insights" "$BRIEF_FILE" 2>/dev/null | head -10 >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    echo "### Urgent Strategic Decisions" >> "$OUTPUT_FILE" 
    grep -A10 "Decisions Requiring CEO Attention" "$BRIEF_FILE" 2>/dev/null | head -5 >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    echo "### Today's Strategic Opportunities" >> "$OUTPUT_FILE"
    grep -A10 "Goal Acceleration Opportunities" "$BRIEF_FILE" 2>/dev/null | head -5 >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    echo "📊 **Full Strategic Analysis:** [[$BRIEF_FILE]]" >> "$OUTPUT_FILE"
else
    echo "*No strategic intelligence brief available yet - agents still building collaboration data*" >> "$OUTPUT_FILE"
fi

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Add existing briefing components
cat >> "$OUTPUT_FILE" << EOF
## 📊 Portfolio & Market Intelligence
*(Existing Herald briefing components would be integrated here)*

## 📅 Calendar & Schedule  
*(Existing calendar preview would be integrated here)*

## 📧 Communications Review
*(Existing email scan would be integrated here)*

---
*Enhanced briefing integrates agent strategic intelligence with traditional briefing components*
*Delivered to: Alexa, #morning-briefing, and Obsidian vault*
EOF

echo "Enhanced morning briefing created: $OUTPUT_FILE"

# Open the enhanced briefing
open "$OUTPUT_FILE"
