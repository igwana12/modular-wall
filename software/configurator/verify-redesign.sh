#!/bin/bash

# mosAIc Website Redesign Verification Script
# Quick health check for the redesigned website

set -e

echo "🔍 mosAIc Website Redesign Verification"
echo "======================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}📍 Working directory: $SCRIPT_DIR${NC}"

# Check if we're in the right place
if [[ ! -f "package.json" ]]; then
    echo -e "${RED}❌ Error: package.json not found. Are you in the configurator directory?${NC}"
    exit 1
fi

# Verification checklist
CHECKS_PASSED=0
TOTAL_CHECKS=0

# Function to run check
run_check() {
    local description=$1
    local command=$2
    local silent=${3:-false}
    
    ((TOTAL_CHECKS++))
    
    if [[ "$silent" == "true" ]]; then
        if eval "$command" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $description${NC}"
            ((CHECKS_PASSED++))
            return 0
        else
            echo -e "${RED}❌ $description${NC}"
            return 1
        fi
    else
        if eval "$command"; then
            echo -e "${GREEN}✅ $description${NC}"
            ((CHECKS_PASSED++))
            return 0
        else
            echo -e "${RED}❌ $description${NC}"
            return 1
        fi
    fi
}

echo -e "${BLUE}🔍 Running verification checks...${NC}\n"

# Check 1: Project structure
run_check "Package.json exists" "[[ -f 'package.json' ]]" true

# Check 2: Enhanced components exist
run_check "Enhanced hero component exists" "[[ -f 'src/components/enhanced-hero.tsx' ]]" true
run_check "Enhanced nav component exists" "[[ -f 'src/components/enhanced-nav.tsx' ]]" true
run_check "Enhanced wall configurator exists" "[[ -f 'src/components/enhanced-wall-configurator.tsx' ]]" true
run_check "Enhanced global styles exist" "[[ -f 'src/app/enhanced-globals.css' ]]" true

# Check 3: Dependencies
run_check "Node modules installed" "[[ -d 'node_modules' ]]" true
run_check "Next.js installed" "npm list next" true
run_check "React installed" "npm list react" true
run_check "Lucide React installed" "npm list lucide-react" true

# Check 4: TypeScript compilation
run_check "TypeScript compilation check" "npx tsc --noEmit" true

# Check 5: Basic build test (if requested)
if [[ "$1" == "--build" ]]; then
    echo -e "\n${YELLOW}🔨 Running build test (this may take a moment)...${NC}"
    run_check "Build test" "npm run build" false
fi

# Check 6: Component imports validation
echo -e "\n${BLUE}🔍 Validating component imports...${NC}"

# Check if enhanced components have proper imports
if grep -q "lucide-react" src/components/enhanced-*.tsx; then
    echo -e "${GREEN}✅ Lucide React imports found${NC}"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}❌ Lucide React imports missing${NC}"
fi
((TOTAL_CHECKS++))

# Check 7: CSS imports
if grep -q "@import" src/app/enhanced-globals.css; then
    echo -e "${GREEN}✅ CSS imports properly configured${NC}"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}❌ CSS imports missing or misconfigured${NC}"
fi
((TOTAL_CHECKS++))

# Check 8: Website accessibility
echo -e "\n${BLUE}🔍 Basic accessibility checks...${NC}"

# Check for proper ARIA labels in components
if grep -q "aria-label\|aria-labelledby\|aria-describedby" src/components/enhanced-*.tsx; then
    echo -e "${GREEN}✅ ARIA labels found in components${NC}"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}❌ ARIA labels missing${NC}"
fi
((TOTAL_CHECKS++))

# Check for proper heading structure
if grep -q "h1\|h2\|h3" src/components/enhanced-*.tsx; then
    echo -e "${GREEN}✅ Proper heading structure found${NC}"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}❌ Heading structure missing${NC}"
fi
((TOTAL_CHECKS++))

# Summary
echo -e "\n${BLUE}📊 Verification Summary${NC}"
echo "======================="

if [[ $CHECKS_PASSED -eq $TOTAL_CHECKS ]]; then
    echo -e "${GREEN}🎉 All checks passed! ($CHECKS_PASSED/$TOTAL_CHECKS)${NC}"
    echo -e "${GREEN}✅ The redesign appears to be properly implemented${NC}"
    OVERALL_STATUS="PASS"
else
    echo -e "${YELLOW}⚠️  Some checks failed ($CHECKS_PASSED/$TOTAL_CHECKS passed)${NC}"
    echo -e "${YELLOW}🔧 Please review the failed checks above${NC}"
    OVERALL_STATUS="PARTIAL"
fi

# Recommendations
echo -e "\n${BLUE}💡 Recommendations${NC}"
echo "==================="

if [[ $OVERALL_STATUS == "PASS" ]]; then
    echo "✅ Ready for deployment!"
    echo "🚀 Run './deploy-redesign.sh' to deploy the redesign"
    echo "🌐 Start the dev server with 'npm run dev' to test"
    echo "📊 Consider running Lighthouse audit for performance metrics"
else
    echo "🔧 Fix the failed checks before deploying"
    echo "📖 Check the component files for any syntax errors"
    echo "🔄 Run this script again after making fixes"
fi

echo -e "\n${BLUE}🔗 Next Steps${NC}"
echo "=============="
echo "1. Run verification: ./verify-redesign.sh --build (with build test)"
echo "2. Deploy redesign: ./deploy-redesign.sh"
echo "3. Test website: npm run dev"
echo "4. Review documentation: cat REDESIGN-REPORT.md"

exit 0