---
layout: default
title: "Rootless Resilience: Testing Container Escape Boundaries"
description: "Analyzing the isolation barriers of rootless Podman containers and techniques for mitigating container escape."
permalink: /research/container-escape-resilience/
---

# Rootless Resilience: Testing Container Escape Boundaries

## Offensive Mindset + Ethical Practice + Auditable Security

This research delves into the isolation barriers of a rootless Podman container running on Arch Linux, exploring the resilience of such environments against container escape attempts. We analyze the effectiveness of user namespaces and other mitigations in protecting the host if isolation is breached.

Key techniques for hardening include:
*   Reducing capabilities (`--cap-drop ALL`)
*   Implementing `seccomp` profiles
*   Mounting read-only file systems
*   Avoiding privileged flags (`--privileged`)

We discuss how to simulate malware's attempts to escape a container and generate objective metrics, all without deploying actual exploits. The work includes a discussion on the Linux kernel's attack surface and typical container runtime vulnerabilities.

Preliminary benchmarks will explore CPU/RAM stress, syscall noise, and network flood tests as a method to probe isolation limits without executing live attacks.
