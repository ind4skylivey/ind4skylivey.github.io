---
layout: default
title: "Rootless Escape Resilience: Testing Container Isolation"
description: "An in-depth analysis of escape resilience in rootless Podman containers on Arch Linux, featuring threat modeling, syscall stress testing, and capability auditing."
permalink: /research/rootless-escape-resilience/
---

# Rootless Escape Resilience
## Testing Container Isolation Boundaries on Arch Linux

---

> **PROJECT STATUS:** `PLANNED` 🟡
> **HOST:** Arch Linux · **ENGINE:** Podman (Rootless)
> **FOCUS:** Container Security · Escape Mitigation · Kernel Isolation
> ![Arch](https://img.shields.io/badge/Arch_Linux-Distro-1793d1?style=flat-square&logo=arch-linux&logoColor=white) ![Podman](https://img.shields.io/badge/Podman-Rootless-892ca0?style=flat-square&logo=podman&logoColor=white)

### ⚡ TL;DR

This research investigates the robustness of **rootless Podman containers** against escape attempts. Unlike traditional Docker setups, rootless containers operate within unprivileged user namespaces. We aim to quantify exactly *how much harder* it is to break out of this environment compared to daemon-based runtimes.

### 🔬 Core Research Areas

1.  **Threat Modeling:** Defining the attack surface of the Linux kernel from a user namespace perspective.
2.  **Stress Testing:** Syscall fuzzing and capabilities abuse attempts.
3.  **Comparative Analysis:** Rootless Podman vs. Rootful Docker.
4.  **Isolation Metrics:** Measuring the effectiveness of seccomp profiles and read-only filesystems.

**Expected Outcome:** A comprehensive audit report, kernel/userns diagrams, and reproducible escape-test methodologies.
