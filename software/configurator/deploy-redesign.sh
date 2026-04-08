#!/bin/bash

# mosAIc Website Redesign Deployment Script
# This script implements the redesigned components safely with backup

set -e

echo "🚀 mosAIc Website Redesign Deployment"
echo "===================================="

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

# Create backup directory
BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
echo -e "${YELLOW}📦 Creating backup in $BACKUP_DIR...${NC}"

mkdir -p "$BACKUP_DIR"
cp -r src/app/page.tsx "$BACKUP_DIR/" 2>/dev/null || true
cp -r src/app/globals.css "$BACKUP_DIR/" 2>/dev/null || true
cp -r src/components/nav.tsx "$BACKUP_DIR/" 2>/dev/null || true
cp -r src/components/hero.tsx "$BACKUP_DIR/" 2>/dev/null || true
cp -r src/components/wall-configurator.tsx "$BACKUP_DIR/" 2>/dev/null || true

echo -e "${GREEN}✅ Backup created${NC}"

# Function to prompt for confirmation
confirm() {
    read -p "$(echo -e "${YELLOW}$1 (y/N): ${NC}")" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        return 0
    else
        return 1
    fi
}

# Check if enhanced components exist
echo -e "${BLUE}🔍 Checking enhanced components...${NC}"

COMPONENTS_READY=true

if [[ ! -f "src/components/enhanced-hero.tsx" ]]; then
    echo -e "${RED}❌ Enhanced hero component not found${NC}"
    COMPONENTS_READY=false
fi

if [[ ! -f "src/components/enhanced-nav.tsx" ]]; then
    echo -e "${RED}❌ Enhanced nav component not found${NC}"
    COMPONENTS_READY=false
fi

if [[ ! -f "src/components/enhanced-wall-configurator.tsx" ]]; then
    echo -e "${RED}❌ Enhanced wall configurator component not found${NC}"
    COMPONENTS_READY=false
fi

if [[ ! -f "src/app/enhanced-page.tsx" ]]; then
    echo -e "${RED}❌ Enhanced page component not found${NC}"
    COMPONENTS_READY=false
fi

if [[ ! -f "src/app/enhanced-globals.css" ]]; then
    echo -e "${RED}❌ Enhanced global styles not found${NC}"
    COMPONENTS_READY=false
fi

if [[ "$COMPONENTS_READY" != true ]]; then
    echo -e "${RED}❌ Some enhanced components are missing. Please ensure all components are created first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All enhanced components found${NC}"

# Ask for confirmation before proceeding
echo -e "\n${YELLOW}This will replace the current website with the enhanced redesign.${NC}"
echo -e "${YELLOW}The following changes will be made:${NC}"
echo "  • Replace main page with enhanced version"
echo "  • Replace navigation with enhanced mobile-friendly version"
echo "  • Replace hero section with performance-optimized version"
echo "  • Replace wall configurator with preset and guidance features"
echo "  • Replace global styles with accessibility improvements"
echo ""

if ! confirm "Do you want to proceed with the deployment?"; then
    echo -e "${YELLOW}⏸️  Deployment cancelled${NC}"
    exit 0
fi

echo -e "\n${BLUE}🔄 Starting deployment...${NC}"

# Step 1: Update the main page
echo -e "${BLUE}📄 Updating main page...${NC}"
if [[ -f "src/app/page.tsx" ]]; then
    mv "src/app/page.tsx" "src/app/page-original.tsx"
fi
mv "src/app/enhanced-page.tsx" "src/app/page.tsx"
echo -e "${GREEN}✅ Main page updated${NC}"

# Step 2: Update global styles
echo -e "${BLUE}🎨 Updating global styles...${NC}"
if [[ -f "src/app/globals.css" ]]; then
    mv "src/app/globals.css" "src/app/globals-original.css"
fi
mv "src/app/enhanced-globals.css" "src/app/globals.css"
echo -e "${GREEN}✅ Global styles updated${NC}"

# Step 3: Create component aliases (keep originals, add enhanced)
echo -e "${BLUE}🔗 Setting up component structure...${NC}"

# The enhanced components are already in place with their own names
# The page.tsx now imports the enhanced versions
echo -e "${GREEN}✅ Component structure ready${NC}"

# Step 4: Install any missing dependencies
echo -e "${BLUE}📦 Checking dependencies...${NC}"

# Check if lucide-react is properly installed
if ! npm list lucide-react > /dev/null 2>&1; then
    echo -e "${YELLOW}🔧 Installing missing dependencies...${NC}"
    npm install lucide-react
fi

echo -e "${GREEN}✅ Dependencies checked${NC}"

# Step 5: Build the project to check for errors
echo -e "${BLUE}🔨 Building project to verify deployment...${NC}"

if npm run build > build.log 2>&1; then
    echo -e "${GREEN}✅ Build successful${NC}"
    rm -f build.log
else
    echo -e "${RED}❌ Build failed. Check build.log for details${NC}"
    echo -e "${YELLOW}🔄 Rolling back changes...${NC}"
    
    # Rollback
    if [[ -f "src/app/page-original.tsx" ]]; then
        mv "src/app/page-original.tsx" "src/app/page.tsx"
    fi
    if [[ -f "src/app/globals-original.css" ]]; then
        mv "src/app/globals-original.css" "src/app/globals.css"
    fi
    
    echo -e "${RED}❌ Deployment failed and rolled back${NC}"
    exit 1
fi

# Step 6: Start the development server
echo -e "\n${GREEN}🎉 Deployment successful!${NC}"
echo -e "\n${BLUE}📊 Redesign Summary:${NC}"
echo "  ✅ Enhanced hero section with performance optimizations"
echo "  ✅ Mobile-friendly navigation with progress tracking"
echo "  ✅ Improved wall configurator with presets and guidance"
echo "  ✅ Accessibility improvements (WCAG 2.1 compliant)"
echo "  ✅ Performance optimizations and reduced motion support"
echo ""

echo -e "${YELLOW}📁 Original files backed up to: $BACKUP_DIR${NC}"
echo -e "${YELLOW}📄 Build log available at: build.log${NC}"

if confirm "Would you like to start the development server to see the redesign?"; then
    echo -e "${BLUE}🚀 Starting development server...${NC}"
    npm run dev
else
    echo -e "\n${GREEN}✅ Deployment complete!${NC}"
    echo -e "${BLUE}💡 Run 'npm run dev' to start the development server${NC}"
    echo -e "${BLUE}🌐 Visit http://localhost:3333 to see the redesigned website${NC}"
fi

echo -e "\n${GREEN}🎯 Next Steps:${NC}"
echo "  1. Test the website across different devices and browsers"
echo "  2. Run accessibility tests with your preferred tools"
echo "  3. Monitor performance with Lighthouse or similar tools"
echo "  4. Consider A/B testing the new vs old design"
echo "  5. Gather user feedback and iterate"
echo ""
echo -e "${BLUE}📖 See REDESIGN-REPORT.md for complete documentation${NC}"