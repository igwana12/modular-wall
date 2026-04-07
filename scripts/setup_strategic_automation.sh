
# Setup strategic intelligence automation
echo "Setting up strategic intelligence automation..."

# Daily strategic brief at 7:30 AM
(crontab -l 2>/dev/null; echo "30 7 * * * /Users/claw2501/scripts/generate_strategic_brief.sh") | crontab -

# Weekly strategic analysis on Monday at 8:00 AM  
(crontab -l 2>/dev/null; echo "0 8 * * 1 /Users/claw2501/scripts/weekly_strategic_analysis.sh") | crontab -

echo "Strategic intelligence automation configured"
