---
layout: default
title: "Multi-Network Cyberdecks: Simulated C2 for Secure Malware Execution"
description: "Creating offensive network simulation scenarios using multi-network rootless containers for secure malware execution and C2 simulation."
permalink: /research/offensive-network-simulation/
---

# Multi-Network Cyberdecks: Simulated C2 for Secure Malware Execution

## Controlled Hacker-Command Center with Virtual Networks

This research focuses on building sophisticated offensive network simulation scenarios using multi-network rootless containers. The core idea is to create an environment where a malware container believes it's communicating with the "Internet," but is, in fact, interacting with a controlled listener on an internal network (`netLAB`).

We explore the simulation of various server roles:
*   `netLAN` for internal malware communication
*   `netLAB` for fake C2 infrastructure
*   `netWAN` for additional segmentation and egress control
*   `netDNS` for simulating controlled DNS resolution

Practical examples will include detailed logs, demonstrations of malware attempting to reach the fake C2 without real internet access, PCAP captures, and interpretation of packets sent to the internal listener. Benchmarks will evaluate latency between internal networks to measure the impact of virtualized networking.

**Expected Outcome:** A reproducible design, a visualizable topology, and a fun sandbox environment for offensive research without compromising production systems.
