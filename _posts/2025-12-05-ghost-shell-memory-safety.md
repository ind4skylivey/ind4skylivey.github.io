---
layout: default
title: "Ghost Shell: Memory Safety in the Terminal"
date: 2025-12-05 14:00:00 +0000
categories: [Security, Rust, Terminal]
---

# Ghost Shell: Memory Safety in the Terminal

The terminal is where we live. It's where we type passwords, API keys, and sensitive commands. Yet, many shells are surprisingly lax about memory hygiene.

## The Problem: Lingering Secrets

In standard shells, command history and variables often linger in RAM long after they are needed. If a process dumps memory, your secrets are exposed.

## The Solution: Zeroization

**Ghost Shell** implements aggressive zeroization. As soon as a sensitive variable goes out of scope, its memory address is overwritten with zeros.

```rust
use zeroize::Zeroize;

struct Secret {
    key: String,
}

impl Drop for Secret {
    fn drop(&mut self) {
        self.key.zeroize();
    }
}
```

## Visuals & Themes

Security doesn't have to be ugly. Ghost Shell comes with the **Cyber-Noir** theme out of the box, featuring high-contrast syntax highlighting and a minimal HUD.

Check out the [project page](/projects/ghost-shell/) for installation instructions.
