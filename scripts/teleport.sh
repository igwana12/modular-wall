#!/usr/bin/env bash
# teleport.sh - Claude Code Session Mobility Toolkit
# Enables cross-device session handoff via export/resume/list commands
#
# Usage:
#   teleport.sh list              - Show recent sessions with IDs
#   teleport.sh export [name]     - Export current session context to JSON
#   teleport.sh resume <id>       - Resume a session by ID (full UUID or short)
#   teleport.sh remote-info       - Show remote access connection details
#   teleport.sh help              - Show this help

set -euo pipefail

TELEPORT_DIR="${HOME}/.claude/teleport"
SESSIONS_DIR="${HOME}/.claude/sessions"
PROJECTS_DIR="${HOME}/.claude/projects"

mkdir -p "$TELEPORT_DIR"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

usage() {
    echo -e "${CYAN}Claude Code Teleport - Session Mobility Toolkit${NC}"
    echo ""
    echo "Commands:"
    echo "  list              Show recent sessions with IDs and metadata"
    echo "  export [name]     Export session context to a teleport package"
    echo "  resume <id>       Resume a session (UUID or short ID from list)"
    echo "  remote-info       Show SSH + Cloudflare Tunnel connection details"
    echo "  help              Show this help"
    echo ""
    echo "Mobile workflow:"
    echo "  1. On desktop:  teleport.sh export my-session"
    echo "  2. On phone:    SSH via Termius/Blink through Cloudflare Tunnel"
    echo "  3. On phone:    teleport.sh resume <session-id>"
}

cmd_list() {
    echo -e "${CYAN}Recent Claude Code Sessions${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    # Parse session files and display
    local count=0
    for session_file in "$SESSIONS_DIR"/*.json; do
        [ -f "$session_file" ] || continue

        local pid session_id cwd started_at kind
        pid=$(python3 -c "import json; d=json.load(open('$session_file')); print(d.get('pid','?'))" 2>/dev/null || echo "?")
        session_id=$(python3 -c "import json; d=json.load(open('$session_file')); print(d.get('sessionId','?'))" 2>/dev/null || echo "?")
        cwd=$(python3 -c "import json; d=json.load(open('$session_file')); print(d.get('cwd','?'))" 2>/dev/null || echo "?")
        started_at=$(python3 -c "import json,datetime; d=json.load(open('$session_file')); ts=d.get('startedAt',0)/1000; print(datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M'))" 2>/dev/null || echo "?")
        kind=$(python3 -c "import json; d=json.load(open('$session_file')); print(d.get('kind','?'))" 2>/dev/null || echo "?")

        # Check if process is still running
        local status="stopped"
        if kill -0 "$pid" 2>/dev/null; then
            status="${GREEN}active${NC}"
        else
            status="${YELLOW}stopped${NC}"
        fi

        local short_id="${session_id:0:8}"
        local short_cwd="${cwd/#$HOME/~}"

        echo -e "  ${GREEN}${short_id}${NC}  ${started_at}  [${status}]  ${kind}  ${short_cwd}"
        echo -e "    Full ID: ${session_id}"
        count=$((count + 1))
    done

    if [ $count -eq 0 ]; then
        echo "  No sessions found."
    fi

    echo ""
    echo -e "Total: ${count} sessions"
    echo ""
    echo -e "Resume: ${CYAN}claude --resume <session-id>${NC}"
    echo -e "   or:  ${CYAN}teleport.sh resume <short-id>${NC}"
}

cmd_export() {
    local name="${1:-$(date +%Y%m%d-%H%M%S)}"
    local export_file="${TELEPORT_DIR}/${name}.json"

    echo -e "${CYAN}Exporting session context...${NC}"

    # Gather context
    local cwd git_branch git_status recent_files
    cwd=$(pwd)
    git_branch=$(git -C "$cwd" branch --show-current 2>/dev/null || echo "none")
    git_status=$(git -C "$cwd" status --short 2>/dev/null | head -20 || echo "")

    # Find the most recent active session for this directory
    local latest_session=""
    local latest_ts=0
    for session_file in "$SESSIONS_DIR"/*.json; do
        [ -f "$session_file" ] || continue
        local s_cwd s_ts s_id
        s_cwd=$(python3 -c "import json; print(json.load(open('$session_file')).get('cwd',''))" 2>/dev/null || echo "")
        s_ts=$(python3 -c "import json; print(json.load(open('$session_file')).get('startedAt',0))" 2>/dev/null || echo "0")
        s_id=$(python3 -c "import json; print(json.load(open('$session_file')).get('sessionId',''))" 2>/dev/null || echo "")

        if [ "$s_ts" -gt "$latest_ts" ] 2>/dev/null; then
            latest_ts="$s_ts"
            latest_session="$s_id"
        fi
    done

    # Get recent files from git
    recent_files=$(git -C "$cwd" log --diff-filter=M --name-only --pretty=format: -5 2>/dev/null | sort -u | head -20 || echo "")

    # Build export JSON
    python3 -c "
import json, datetime

export_data = {
    'name': '${name}',
    'exported_at': datetime.datetime.now(datetime.timezone.utc).isoformat().replace('+00:00', 'Z'),
    'session_id': '${latest_session}',
    'working_directory': '${cwd}',
    'git_branch': '${git_branch}',
    'hostname': '$(hostname)',
    'user': '$(whoami)',
    'resume_command': 'claude --resume ${latest_session}',
    'resume_in_dir_command': 'cd ${cwd} && claude --resume ${latest_session}',
    'git_status': '''${git_status}'''.strip().split('\n') if '''${git_status}'''.strip() else [],
    'recent_files': '''${recent_files}'''.strip().split('\n') if '''${recent_files}'''.strip() else [],
    'notes': 'Use resume_command to continue this session on any device with access to this filesystem'
}

with open('${export_file}', 'w') as f:
    json.dump(export_data, f, indent=2)
print(json.dumps(export_data, indent=2))
"

    echo ""
    echo -e "${GREEN}Exported to: ${export_file}${NC}"
    echo ""
    echo -e "Resume command: ${CYAN}claude --resume ${latest_session}${NC}"
    echo ""
    echo "To resume from another device:"
    echo "  1. SSH into this machine (see: teleport.sh remote-info)"
    echo "  2. Run: claude --resume ${latest_session}"
}

cmd_resume() {
    local target_id="$1"

    if [ -z "$target_id" ]; then
        echo -e "${RED}Error: Provide a session ID (full UUID or short prefix)${NC}"
        echo "Run 'teleport.sh list' to see available sessions"
        exit 1
    fi

    # If short ID, find full UUID
    local full_id=""

    # First check teleport exports
    for export_file in "$TELEPORT_DIR"/*.json; do
        [ -f "$export_file" ] || continue
        local s_id
        s_id=$(python3 -c "import json; print(json.load(open('$export_file')).get('session_id',''))" 2>/dev/null || echo "")
        if [[ "$s_id" == "$target_id"* ]]; then
            full_id="$s_id"
            local s_cwd
            s_cwd=$(python3 -c "import json; print(json.load(open('$export_file')).get('working_directory',''))" 2>/dev/null || echo "")
            if [ -n "$s_cwd" ] && [ -d "$s_cwd" ]; then
                echo -e "${CYAN}Changing to exported working directory: ${s_cwd}${NC}"
                cd "$s_cwd"
            fi
            break
        fi
    done

    # Then check session files
    if [ -z "$full_id" ]; then
        for session_file in "$SESSIONS_DIR"/*.json; do
            [ -f "$session_file" ] || continue
            local s_id
            s_id=$(python3 -c "import json; print(json.load(open('$session_file')).get('sessionId',''))" 2>/dev/null || echo "")
            if [[ "$s_id" == "$target_id"* ]]; then
                full_id="$s_id"
                break
            fi
        done
    fi

    if [ -z "$full_id" ]; then
        echo -e "${RED}No session found matching: ${target_id}${NC}"
        echo "Run 'teleport.sh list' to see available sessions"
        exit 1
    fi

    echo -e "${GREEN}Resuming session: ${full_id}${NC}"
    exec claude --resume "$full_id"
}

cmd_remote_info() {
    echo -e "${CYAN}Remote Access Configuration${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Hostname: $(hostname)"
    echo "User:     $(whoami)"
    echo "Claude:   $(claude --version 2>/dev/null || echo 'not found')"
    echo ""

    # Check Cloudflare Tunnel
    if [ -f "${HOME}/.cloudflared/config.yml" ]; then
        echo -e "${GREEN}Cloudflare Tunnel: Configured${NC}"
        echo "  Tunnel name: $(grep '^tunnel:' ~/.cloudflared/config.yml | awk '{print $2}')"
        echo "  Ingress rules:"
        grep 'hostname:' ~/.cloudflared/config.yml | while read -r line; do
            echo "    $line"
        done
    else
        echo -e "${YELLOW}Cloudflare Tunnel: Not configured${NC}"
    fi

    echo ""
    echo -e "${CYAN}SSH Access Setup${NC}"
    echo ""

    # Check if SSH is enabled
    if launchctl list com.openssh.sshd 2>/dev/null | grep -q "PID"; then
        echo -e "  SSH Server: ${GREEN}Running${NC}"
    else
        echo -e "  SSH Server: ${YELLOW}Not running${NC}"
        echo "  Enable: System Settings > General > Sharing > Remote Login"
    fi

    echo ""
    echo -e "${CYAN}Mobile Connection Steps${NC}"
    echo ""
    echo "  Option A: Local Network (same WiFi)"
    echo "    1. Install Termius or Blink Shell on iPhone/iPad"
    echo "    2. Connect: ssh $(whoami)@$(hostname -s).local"
    echo "    3. Run: teleport.sh list"
    echo "    4. Run: teleport.sh resume <session-id>"
    echo ""
    echo "  Option B: Cloudflare Tunnel (anywhere)"
    echo "    1. Add SSH ingress to ~/.cloudflared/config.yml:"
    echo "       - hostname: ssh.nikoskatsaounis.com"
    echo "         service: ssh://localhost:22"
    echo "    2. Restart tunnel: cloudflared tunnel run smithers"
    echo "    3. On phone: ssh $(whoami)@ssh.nikoskatsaounis.com"
    echo "    4. Run: teleport.sh resume <session-id>"
    echo ""
    echo "  Option C: Claude Code Web (if available)"
    echo "    Visit: https://claude.ai/code"
    echo "    Connect to this machine's session directly"
}

# Main dispatch
case "${1:-help}" in
    list)       cmd_list ;;
    export)     cmd_export "${2:-}" ;;
    resume)     cmd_resume "${2:-}" ;;
    remote-info|remote) cmd_remote_info ;;
    help|--help|-h) usage ;;
    *)
        echo -e "${RED}Unknown command: $1${NC}"
        usage
        exit 1
        ;;
esac
