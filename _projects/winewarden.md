---
layout: "project"
title: "WineWarden"
description: "Comprehensive security sandbox for Windows games on Linux with real-time monitoring, filesystem virtualization, and dynamic trust scoring."
tags: ["Rust", "Security", "Sandbox", "Linux Gaming", "Wine", "Proton"]
repo: "https://github.com/S1b-Team/winewarden"
featured: true
version: "2.0"
status: "beta"
stats:
  - value: "99.8%"
    label: "Rust"
  - value: "1"
    label: "Stars"
  - value: "S1B"
    label: "Organization"
---

## Overview

WineWarden is a calm, always-on protection layer for Wine, Proton, Lutris, and Steam. It provides **real-time filesystem virtualization**, **network monitoring**, **process sandboxing**, and **dynamic trust scoring** — all through an elegant terminal interface.

```
==[ W I N E W A R D E N ]===================================================
calm by design · silent by default · strict by choice
==============================================================================
```

## Key Features

### 🛡️ Filesystem Virtualization
- **Mount Namespace Isolation**: Creates private filesystem namespaces with bind-mount virtualization
- **Path Mapping**: Prefix-based redirects (e.g., `${HOME}` → `${DATA_DIR}/virtual/home`)
- **Copy-on-Write**: First-write semantics for efficient file virtualization
- **Landlock Sandbox**: Kernel-level access control for defense-in-depth

### 🌐 Network Awareness
- **DNS Packet Parser**: Full parsing of DNS queries/responses (A, AAAA, CNAME, MX, NS, TXT, SRV)
- **Destination Tracking**: Monitors outbound connections and unique destinations
- **Network Telemetry**: Tracks connection success rates, protocols, and ports
- **Real-time Interception**: Seccomp-based syscall interception for connect/bind

### 🔒 Process Security
- **Process Policy Engine**: Wildcard pattern matching for allowed/blocked processes
- **Shell & Script Blocking**: Prevents execution of bash, powershell, Python scripts, etc.
- **Child Process Limits**: Configurable maximum process count (prevents fork bombs)
- **Dynamic Trust Scoring**: 0-100 score based on runtime behavior with trend analysis

### 📊 Interactive TUI Dashboard
- **Real-time Monitoring**: Live session statistics with 20 FPS rendering
- **5 Interactive Screens**: Dashboard, Trust, Network, Processes, Events
- **Keyboard Navigation**: Tab/arrows for screens, `/` to filter, Q to quit

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        WineWarden CLI                        │
│                    (TUI + Commands)                          │
└────────────────────┬────────────────────────────────────────┘
                     │
    ┌────────────────┼────────────────┐
    │                │                │
    ▼                ▼                ▼
┌─────────┐    ┌──────────┐    ┌──────────┐
│ Monitor │◄──►│ Policy   │◄──►│ NetCompat│
│ (Sandbox)│    │ Engine   │    │ (DNS/Net)│
└────┬────┘    └────┬─────┘    └────┬─────┘
     │              │               │
     ▼              ▼               ▼
┌─────────┐    ┌──────────┐    ┌──────────┐
│Landlock │    │ Process  │    │ Telemetry│
│Mount NS │    │ Rules    │    │ Tracking │
│Seccomp  │    │ Trust    │    │          │
└─────────┘    │ Scoring  │    └──────────┘
               └──────────┘
```

## System Requirements

- **Linux Kernel 5.11+** (for Landlock and Seccomp Notify)
- **libseccomp** development headers

## Quick Start

```bash
# Build from source
cargo build --release

# Install binaries
cargo install --path crates/winewarden-cli
cargo install --path crates/winewarden-daemon

# Initialize configuration
winewarden init

# Launch the TUI dashboard
winewarden monitor

# Run a game with full protection
winewarden run /path/to/game.exe -- -arg1 -arg2
```

## Trust Tiers

| Tier | Color | Behavior |
|------|-------|----------|
| **Green** | 🟢 | Trusted, minimal restrictions |
| **Yellow** | 🟡 | Unknown, balanced protection (default) |
| **Red** | 🔴 | Untrusted, strict isolation |

## About

Built with ❤️ by **S1BGr0up** — Open intelligence is ethical intelligence.
