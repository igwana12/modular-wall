# Session Mobility Cheat Sheet

Quick reference card for Claude Code cross-device session management.

## Session Naming Convention

Use `project-task` format for all named sessions:

| Project | Example Session Names |
|---------|----------------------|
| JARVIS frontend | `jarvis-frontend`, `jarvis-panels`, `jarvis-voice` |
| Orb hardware | `orb-hardware`, `orb-firmware`, `orb-pov-globe` |
| Sacred Circuits content | `sc-content`, `sc-myths`, `sc-cards` |
| Trading signals | `trading-signals`, `trading-backtest` |
| Infrastructure | `infra-smithers`, `infra-tunnels`, `infra-deploy` |
| Planning | `planning-phase12`, `planning-roadmap` |

Start sessions with a name:
```bash
claude --name "jarvis-frontend"
```

## Command Reference

### Core CLI Flags

| Flag | Purpose | Example |
|------|---------|---------|
| `--name "X"` | Start a named session | `claude --name "orb-firmware"` |
| `--resume <id>` | Resume by session ID | `claude --resume 810543bc` |
| `--continue` | Continue most recent session in cwd | `claude --continue` |

### Teleport Commands

| Command | What It Does |
|---------|--------------|
| `teleport.sh list` | Show all sessions with IDs and status |
| `teleport.sh export [name]` | Package session context to JSON |
| `teleport.sh resume <id>` | Find session by short ID prefix and resume |
| `teleport.sh remote-info` | Show SSH + tunnel connection status |

### Common Workflows

**Continue where you left off (same machine):**
```bash
cd /path/to/project
claude --continue
```

**Hand off to phone:**
```bash
# Desktop: export current session
teleport.sh export jarvis-work

# Phone (via SSH): pick it up
teleport.sh resume <short-id>
```

**Start a fresh named session:**
```bash
claude --name "sc-content-batch"
```

## SSH Setup for Phone Access

### Prerequisites

1. **Enable SSH on Mac**
   - System Settings > General > Sharing > Remote Login > ON
   - Or: `sudo systemsetup -setremotelogin on`

2. **Install SSH app on iPhone/iPad**
   - Termius (recommended, free tier works)
   - Blink Shell (power user, Mosh support)

3. **Copy SSH key to phone app**
   - Generate key in Termius/Blink
   - Add public key to `~/.ssh/authorized_keys` on Mac

### Connection Options

**Local network (same WiFi):**
```bash
ssh claw2501@Nikos-MacBook-Pro.local
```

**Anywhere (via Cloudflare Tunnel):**
```bash
ssh claw2501@ssh.nikoskatsaounis.com
```

Requires Cloudflare Tunnel running with SSH ingress:
```yaml
# ~/.cloudflared/config.yml
ingress:
  - hostname: ssh.nikoskatsaounis.com
    service: ssh://localhost:22
```

### Tunnel Management

```bash
# Start tunnel
cloudflared tunnel run smithers

# Check tunnel status
cloudflared tunnel info smithers

# Verify SSH ingress
curl -v ssh.nikoskatsaounis.com 2>&1 | head -5
```

## Phone Round-Trip Test

**Status: PENDING** (deferred to 2-week soak period)

Test procedure when ready:

1. [ ] Start named session on desktop: `claude --name "mobility-test"`
2. [ ] Export session: `teleport.sh export mobility-test`
3. [ ] SSH from phone (local WiFi): `ssh claw2501@Nikos-MacBook-Pro.local`
4. [ ] List sessions: `teleport.sh list`
5. [ ] Resume session: `teleport.sh resume <id>`
6. [ ] Verify conversation history is visible
7. [ ] Send a message and confirm response
8. [ ] SSH from phone (Cloudflare Tunnel): `ssh claw2501@ssh.nikoskatsaounis.com`
9. [ ] Repeat steps 4-7 via tunnel

Record results here after testing:

| Test | Local WiFi | Cloudflare Tunnel |
|------|-----------|-------------------|
| SSH connects | PENDING | PENDING |
| Sessions listed | PENDING | PENDING |
| Resume works | PENDING | PENDING |
| History preserved | PENDING | PENDING |
| Can send messages | PENDING | PENDING |

## Tips

- Short IDs work everywhere (first 8 chars of UUID)
- `--continue` is the fastest way to pick up work in the same project directory
- Named sessions are searchable: `claude --resume "jarvis"` finds partial matches
- Teleport exports are stored at `~/.claude/teleport/` as JSON files
- Keep the Cloudflare Tunnel running as a launchd service for always-on access
