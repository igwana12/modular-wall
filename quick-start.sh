#!/bin/bash

# mosAIc Project Quick Start Script
# For new team members or session handoffs

set -e

echo "🚀 mosAIc Project Quick Start"
echo "============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the script directory (project root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}📍 Project root: $SCRIPT_DIR${NC}"

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

# Check if we're in the right place
if [[ ! -f "HANDOFF-BRIEFING.md" ]]; then
    echo -e "${RED}❌ Error: HANDOFF-BRIEFING.md not found. Are you in the project root?${NC}"
    exit 1
fi

echo -e "\n${GREEN}✅ Project files found${NC}"

# Display current status
echo -e "\n${BLUE}📊 Current Project Status${NC}"
echo "=========================="
echo "• Website redesign: ✅ Complete"
echo "• Development server: Ready to start"
echo "• Build status: ✅ Verified"
echo "• Next phase: Oracle Cards development"

# Check if configurator directory exists
CONFIGURATOR_DIR="software/configurator"
if [[ ! -d "$CONFIGURATOR_DIR" ]]; then
    echo -e "${RED}❌ Error: Configurator directory not found at $CONFIGURATOR_DIR${NC}"
    exit 1
fi

echo -e "\n${BLUE}🔍 Quick Environment Check${NC}"
echo "==========================="

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js not found${NC}"
    echo "Please install Node.js to continue"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ npm: $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm not found${NC}"
    exit 1
fi

# Check if dependencies are installed
cd "$CONFIGURATOR_DIR"
if [[ -d "node_modules" ]]; then
    echo -e "${GREEN}✅ Dependencies: Installed${NC}"
else
    echo -e "${YELLOW}⚠️  Dependencies: Need installation${NC}"
    
    if confirm "Install dependencies now?"; then
        echo -e "${BLUE}📦 Installing dependencies...${NC}"
        npm install
        echo -e "${GREEN}✅ Dependencies installed${NC}"
    else
        echo -e "${YELLOW}⚠️  You'll need to run 'npm install' before starting the server${NC}"
    fi
fi

cd "$SCRIPT_DIR"

echo -e "\n${BLUE}📖 Essential Documentation${NC}"
echo "=========================="
echo "1. 📄 HANDOFF-BRIEFING.md - Complete project status (START HERE)"
echo "2. 📊 software/configurator/REDESIGN-REPORT.md - Technical details"
echo "3. 🎯 PROJECT.md - Core project definition"
echo "4. 🛠️  TECH-STACK.md - Technical stack reference"

echo -e "\n${BLUE}🚀 Quick Start Options${NC}"
echo "======================"
echo "1. View project briefing"
echo "2. Start development server"
echo "3. Run full verification"
echo "4. Open project in Finder"
echo "5. Show all available commands"

# Interactive menu
echo ""
read -p "$(echo -e "${YELLOW}Choose an option (1-5) or 'q' to quit: ${NC}")" -n 1 -r
echo

case $REPLY in
    1)
        echo -e "\n${BLUE}📄 Opening project briefing...${NC}"
        if command -v bat &> /dev/null; then
            bat HANDOFF-BRIEFING.md
        elif command -v less &> /dev/null; then
            less HANDOFF-BRIEFING.md
        else
            cat HANDOFF-BRIEFING.md
        fi
        ;;
    2)
        echo -e "\n${BLUE}🚀 Starting development server...${NC}"
        cd "$CONFIGURATOR_DIR"
        echo -e "${GREEN}Opening http://localhost:3333 in browser...${NC}"
        
        # Open browser (macOS)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open http://localhost:3333 &
        fi
        
        # Start the server
        npm run dev
        ;;
    3)
        echo -e "\n${BLUE}🔍 Running verification...${NC}"
        cd "$CONFIGURATOR_DIR"
        if [[ -f "verify-redesign.sh" ]]; then
            ./verify-redesign.sh
        else
            echo -e "${RED}❌ Verification script not found${NC}"
        fi
        ;;
    4)
        echo -e "\n${BLUE}📁 Opening project in Finder...${NC}"
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open .
        else
            echo -e "${YELLOW}Finder only available on macOS${NC}"
            echo -e "${BLUE}Project location: $SCRIPT_DIR${NC}"
        fi
        ;;
    5)
        echo -e "\n${BLUE}💻 Available Commands${NC}"
        echo "===================="
        echo ""
        echo -e "${YELLOW}Development:${NC}"
        echo "cd software/configurator && npm run dev    # Start dev server"
        echo "cd software/configurator && npm run build  # Build for production"
        echo ""
        echo -e "${YELLOW}Verification:${NC}"
        echo "cd software/configurator && ./verify-redesign.sh  # Quick check"
        echo "cd software/configurator && ./verify-redesign.sh --build  # With build test"
        echo ""
        echo -e "${YELLOW}Documentation:${NC}"
        echo "cat HANDOFF-BRIEFING.md           # Project status"
        echo "cat PROJECT.md                    # Core project info"
        echo "cat TECH-STACK.md                # Technical details"
        echo ""
        echo -e "${YELLOW}Backup/Recovery:${NC}"
        echo "cd software/configurator && ls backup-*  # View backups"
        echo ""
        echo -e "${BLUE}💡 Tip: Start with 'cat HANDOFF-BRIEFING.md' for complete context${NC}"
        ;;
    q|Q)
        echo -e "\n${GREEN}👋 Happy coding!${NC}"
        exit 0
        ;;
    *)
        echo -e "\n${RED}❌ Invalid option${NC}"
        exit 1
        ;;
esac

echo -e "\n${GREEN}🎯 You're all set!${NC}"
echo -e "${BLUE}💡 Next: Read HANDOFF-BRIEFING.md for complete context${NC}"
echo -e "${BLUE}🌐 Website: http://localhost:3333${NC}"