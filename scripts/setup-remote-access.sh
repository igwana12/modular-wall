#!/usr/bin/env bash
# setup-remote-access.sh - Configure SSH + Cloudflare Tunnel for remote Claude Code access
#
# This script:
# 1. Checks if Remote Login (SSH) is enabled on macOS
# 2. Adds SSH ingress to Cloudflare Tunnel config (if not already present)
# 3. Creates a symlink for teleport.sh in ~/bin for PATH access
# 4. Validates the configuration

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CF_CONFIG="${HOME}/.cloudflared/config.yml"
TELEPORT_SCRIPT="${SCRIPT_DIR}/teleport.sh"

echo -e "${CYAN}Setting up Remote Access for Claude Code${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Check SSH
echo -e "${CYAN}[1/4] Checking SSH server...${NC}"
if sudo systemsetup -getremotelogin 2>/dev/null | grep -qi "on"; then
    echo -e "  ${GREEN}Remote Login is ON${NC}"
else
    echo -e "  ${YELLOW}Remote Login appears to be OFF${NC}"
    echo "  Enable it via: System Settings > General > Sharing > Remote Login"
    echo "  Or run: sudo systemsetup -setremotelogin on"
    echo ""
    read -p "  Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborting. Enable SSH first."
        exit 1
    fi
fi
echo ""

# Step 2: Cloudflare Tunnel SSH ingress
echo -e "${CYAN}[2/4] Configuring Cloudflare Tunnel SSH ingress...${NC}"
if [ -f "$CF_CONFIG" ]; then
    if grep -q "ssh://localhost" "$CF_CONFIG"; then
        echo -e "  ${GREEN}SSH ingress already configured${NC}"
    else
        echo "  Adding SSH ingress to tunnel config..."
        # Backup existing config
        cp "$CF_CONFIG" "${CF_CONFIG}.bak.$(date +%s)"

        # Insert SSH ingress before the catch-all rule
        # The catch-all is always the last ingress rule (service: http_status:404)
        python3 -c "
import yaml, sys

with open('${CF_CONFIG}', 'r') as f:
    config = yaml.safe_load(f)

# Find the catch-all rule and insert SSH before it
ingress = config.get('ingress', [])
ssh_rule = {
    'hostname': 'ssh.nikoskatsaounis.com',
    'service': 'ssh://localhost:22'
}

# Check if already exists
has_ssh = any('ssh://localhost' in str(r.get('service', '')) for r in ingress)
if not has_ssh:
    # Insert before last rule (catch-all)
    if ingress and 'hostname' not in ingress[-1]:
        ingress.insert(-1, ssh_rule)
    else:
        ingress.append(ssh_rule)
    config['ingress'] = ingress

    with open('${CF_CONFIG}', 'w') as f:
        yaml.dump(config, f, default_flow_style=False, sort_keys=False)
    print('  SSH ingress added successfully')
else:
    print('  SSH ingress already present')
" 2>/dev/null || {
            echo -e "  ${YELLOW}PyYAML not available. Manual config needed.${NC}"
            echo "  Add this to ~/.cloudflared/config.yml before the catch-all rule:"
            echo ""
            echo "  - hostname: ssh.nikoskatsaounis.com"
            echo "    service: ssh://localhost:22"
        }
    fi
else
    echo -e "  ${YELLOW}No Cloudflare Tunnel config found at ${CF_CONFIG}${NC}"
    echo "  Set up Cloudflare Tunnel first: cloudflared tunnel create smithers"
fi
echo ""

# Step 3: Symlink teleport.sh to PATH
echo -e "${CYAN}[3/4] Setting up teleport command...${NC}"
mkdir -p "${HOME}/bin"
if [ -L "${HOME}/bin/teleport" ]; then
    echo -e "  ${GREEN}Symlink already exists${NC}"
elif [ -f "$TELEPORT_SCRIPT" ]; then
    ln -sf "$TELEPORT_SCRIPT" "${HOME}/bin/teleport"
    echo -e "  ${GREEN}Created symlink: ~/bin/teleport -> ${TELEPORT_SCRIPT}${NC}"
else
    echo -e "  ${RED}teleport.sh not found at ${TELEPORT_SCRIPT}${NC}"
fi

# Check PATH includes ~/bin
if echo "$PATH" | grep -q "${HOME}/bin"; then
    echo -e "  ${GREEN}~/bin is in PATH${NC}"
else
    echo -e "  ${YELLOW}~/bin is not in PATH. Add to ~/.zshrc:${NC}"
    echo '  export PATH="$HOME/bin:$PATH"'
fi
echo ""

# Step 4: Validate
echo -e "${CYAN}[4/4] Validation${NC}"
echo -e "  Claude Code: $(claude --version 2>/dev/null || echo 'not found')"
echo -e "  teleport.sh: $([ -x "$TELEPORT_SCRIPT" ] && echo "${GREEN}executable${NC}" || echo "${RED}not found${NC}")"
echo -e "  CF config:   $([ -f "$CF_CONFIG" ] && echo "${GREEN}exists${NC}" || echo "${RED}missing${NC}")"
if [ -f "$CF_CONFIG" ]; then
    echo -e "  SSH ingress: $(grep -q 'ssh://localhost' "$CF_CONFIG" && echo "${GREEN}configured${NC}" || echo "${YELLOW}not configured${NC}")"
fi
echo ""

echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Enable Remote Login in System Settings if not already on"
echo "  2. Add SSH DNS record in Cloudflare Dashboard: ssh.nikoskatsaounis.com -> tunnel"
echo "  3. Restart tunnel: cloudflared tunnel run smithers"
echo "  4. Test from phone: ssh $(whoami)@ssh.nikoskatsaounis.com"
echo "  5. On phone: teleport list && teleport resume <id>"
