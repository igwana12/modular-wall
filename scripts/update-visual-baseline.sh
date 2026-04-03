#!/bin/bash
# Update visual QA baselines from latest screenshots
# Usage: bash scripts/update-visual-baseline.sh

BASELINES_DIR="$HOME/.visual-qa/baselines"
SCREENSHOTS_DIR="$HOME/.visual-qa/screenshots"

mkdir -p "$BASELINES_DIR"

# Copy latest screenshot as new baseline
latest=$(ls -t "$SCREENSHOTS_DIR"/jarvis-dashboard-*.png 2>/dev/null | head -1)
if [ -z "$latest" ]; then
  echo "No screenshots found. Run a JARVIS frontend edit to trigger a screenshot first."
  exit 1
fi

cp "$latest" "$BASELINES_DIR/jarvis-dashboard.png"
echo "Baseline updated: $BASELINES_DIR/jarvis-dashboard.png"
echo "Source: $latest"

# Clear regression state
echo '{"has_regression":false,"timestamp":"'"$(date -u +%Y-%m-%dT%H:%M:%SZ)"'"}' > /tmp/visual-qa-state.json
echo "Regression state cleared. Commits are unblocked."
