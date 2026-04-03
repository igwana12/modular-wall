# Session Mobility - Cross-Device Claude Code

Start a Claude Code session on your Mac, continue it from your iPhone.

## Quick Start

```bash
# On desktop: see active sessions
./scripts/teleport.sh list

# On desktop: export session for handoff
./scripts/teleport.sh export my-work

# On phone (via SSH): resume session
teleport resume <session-id>
```

## Architecture

```
iPhone (Termius/Blink)
    |
    | SSH over Cloudflare Tunnel
    |
    v
Mac Desktop (Claude Code CLI)
    |
    | claude --resume <session-id>
    |
    v
Session Storage (~/.claude/sessions/, ~/.claude/projects/)
```

Claude Code sessions are stored locally on disk. The `--resume` flag reconnects to an existing conversation including full history. By accessing the Mac remotely via SSH, you get the same Claude Code experience from any device.

## Setup

### 1. Enable SSH on Mac

System Settings > General > Sharing > Remote Login > ON

Or via terminal:
```bash
sudo systemsetup -setremotelogin on
```

### 2. Configure Cloudflare Tunnel (for access outside local network)

The existing Smithers tunnel at `~/.cloudflared/config.yml` needs an SSH ingress rule:

```yaml
ingress:
  - hostname: ssh.nikoskatsaounis.com
    service: ssh://localhost:22
  # ... existing rules ...
  - service: http_status:404
```

Then add a CNAME record in Cloudflare DNS:
- Name: `ssh`
- Target: `<tunnel-id>.cfargotunnel.com`

Restart the tunnel:
```bash
cloudflared tunnel run smithers
```

### 3. Install Mobile SSH Client

Recommended apps for iOS:
- **Termius** - Full-featured SSH client, free tier works fine
- **Blink Shell** - Power user SSH with Mosh support

Configure a new host:
- Host: `ssh.nikoskatsaounis.com` (tunnel) or `<hostname>.local` (local WiFi)
- User: `claw2501`
- Auth: SSH key (copy public key to Mac's `~/.ssh/authorized_keys`)

### 4. Run Setup Script (optional)

```bash
./scripts/setup-remote-access.sh
```

This automates steps 1-2 and creates a `teleport` symlink in `~/bin/`.

## Commands

| Command | Description |
|---------|-------------|
| `teleport.sh list` | Show all sessions with IDs, status, timestamps |
| `teleport.sh export [name]` | Save session context to `~/.claude/teleport/` |
| `teleport.sh resume <id>` | Resume a session (accepts short ID prefix) |
| `teleport.sh remote-info` | Show connection details and setup status |

## Workflows

### Same WiFi (fastest)

```bash
# From phone:
ssh claw2501@Nikos-MacBook-Pro.local
cd /path/to/project
claude --continue  # Continue most recent session in this directory
```

### Anywhere via Tunnel

```bash
# From phone:
ssh claw2501@ssh.nikoskatsaounis.com
teleport list
teleport resume 810543bc  # Short ID prefix works
```

### Named Sessions

```bash
# On desktop: name your session
claude --name "oracle-cards-work"

# On phone: find by name in resume picker
claude --resume "oracle"
```

## How It Works

1. **Session persistence**: Claude Code saves conversation state to `~/.claude/projects/<project-hash>/<session-uuid>/` as JSONL files
2. **Session registry**: Active sessions are tracked in `~/.claude/sessions/<pid>.json` with session ID, working directory, and start time
3. **Resume**: `claude --resume <id>` loads the full conversation history and reconnects
4. **Teleport export**: Packages session ID + working directory + git context into a portable JSON file

## Limitations

- Session files must be on the same filesystem (SSH to the same Mac)
- Claude Code must be installed and authenticated on the machine
- Cloudflare Tunnel requires the tunnel daemon running (`cloudflared tunnel run smithers`)
- SSH requires Remote Login enabled in macOS System Settings
