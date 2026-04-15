# Claude Code Skills

Skills are invoked using `/skill-name` in Claude Code.

## Available Skills

| Skill | Command | Description |
|---|---|---|
| Update Config | `/update-config` | Configure Claude Code settings — hooks, permissions, env vars, and automated behaviors via `settings.json` |
| Keybindings Help | `/keybindings-help` | Customize keyboard shortcuts, rebind keys, and modify `~/.claude/keybindings.json` |
| Simplify | `/simplify` | Review changed code for reuse, quality, and efficiency, then fix any issues found |
| Loop | `/loop` | Run a prompt or slash command on a recurring interval (e.g. `/loop 5m /foo`, defaults to 10m) |
| Claude API | `/claude-api` | Build, debug, and optimize Claude API / Anthropic SDK apps with prompt caching |
| Session Start Hook | `/session-start-hook` | Set up a SessionStart hook so tests and linters run on Claude Code web session start |
| Init | `/init` | Initialize a new `CLAUDE.md` file with codebase documentation |
| Status Line | `/statusline` | Set up Claude Code's status line UI |
| Review | `/review` | Review a pull request |
| Security Review | `/security-review` | Complete a security review of pending changes on the current branch |
| Insights | `/insights` | Generate a report analyzing your Claude Code sessions |
| Team Onboarding | `/team-onboarding` | Help teammates ramp on Claude Code with a guide from your usage |
| PDF | `/pdf` | Read and extract content from PDF files for analysis, summarization, or question answering |
