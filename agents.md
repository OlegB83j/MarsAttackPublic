# AGENTS.md

## Purpose

This file defines repository-specific instructions for Gemini and other coding agents. Follow these rules whenever you inspect, modify, test, or document this project.

## Project Overview

- Read the repository structure before making changes.
- Prefer small, focused changes over broad rewrites.
- Preserve existing behavior unless the task explicitly asks for a behavior change.
- When project-specific docs exist, treat them as authoritative over this file.

## Working Rules

1. Understand the request and inspect relevant files before editing.
2. Do not modify unrelated files.
3. Keep public APIs, file formats, and configuration names backward-compatible unless instructed otherwise.
4. Prefer idiomatic code that matches the surrounding style.
5. Add comments only when they clarify non-obvious behavior.
6. Avoid introducing new dependencies unless there is a clear benefit and the project already has a dependency-management pattern.
7. Never commit secrets, tokens, credentials, private keys, or generated local environment files.

## Code Style

- Match the existing formatter, linter, naming, and directory conventions.
- Keep functions small and cohesive.
- Use descriptive names for variables, functions, classes, and test cases.
- Prefer explicit error handling over silent failures.
- Avoid dead code and unused imports.

## Testing and Validation

Before finishing a coding task:

- Run the most relevant tests for the changed area.
- Run formatting and linting commands when they are available and reasonably scoped.
- If tests cannot be run, explain why and describe what should be run manually.
- For bug fixes, add or update tests that would have caught the issue when practical.

## Documentation

Update documentation when changes affect:

- Installation or setup steps
- Public APIs or user-facing behavior
- Configuration options
- CLI commands
- Environment variables
- Operational runbooks

Keep documentation concise and accurate.

## Git and Review Hygiene

- Do not create commits, branches, tags, or pull requests unless explicitly asked.
- Summarize changes clearly at the end of the task.
- Mention tests run and any known gaps.
- Highlight risky changes, migrations, or follow-up work.

## Safety and Security

- Treat all credentials and personal data as sensitive.
- Do not print secrets in logs or test output.
- Validate external inputs at boundaries.
- Prefer safe defaults for permissions, networking, and file access.
- Be careful with destructive commands such as `rm`, database migrations, force-pushes, and production operations.

## Gemini-Specific Guidance

- Use this file as repository guidance when working in Gemini-enabled tools.
- If using Gemini CLI, prefer `GEMINI.md` for Gemini CLI context because Gemini CLI documents `GEMINI.md` as its default context file.
- If using Android Studio Gemini agent files, check the current product requirement: some versions use `AGENTS.md`, while Android Studio Narwhal 3 Feature Drop uses `AGENT.md`.
- If both tool-specific and repository-wide instruction files exist, follow the more specific instruction unless it conflicts with safety rules.

## Response Format for Agent Work

When completing a task, report:

1. What changed
2. Tests or checks run
3. Files modified
4. Any assumptions or follow-up recommendations

Keep the final response brief unless the task requires detailed explanation.
