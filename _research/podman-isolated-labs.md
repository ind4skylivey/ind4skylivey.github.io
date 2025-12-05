---
layout: default
title: "Podman Isolated Labs"
description: "Rootless, Multi-Network Containers for Malware Analysis and Secure Research"
permalink: /research/podman-isolated-labs/
---

# Podman Isolated Labs
## Rootless, Multi-Network Containers for Malware Analysis and Secure Research

---

## 1. TL;DR / Executive Summary

**What is it?**
Podman Isolated Labs is a malware analysis environment built on Arch Linux using **rootless containers** and **isolated virtual networks**.

**Who is it for?**
Security researchers, Red Teamers, and developers needing a disposable, safe sandbox without the overhead of full VMs.

**Problem Solved:**
It allows the execution of real malware samples without compromising the host, maintaining a strict workflow: `Prepare → Isolate → Analyze → Log → Destroy`.

**Key Takeaway:**
In 15 minutes, you will deploy a reproducible infrastructure where you can "break things" safely, collecting logs and traffic (PCAP) with zero persistence.

---

## 2. Threat Model & Ethics

### ⚠️ Ethical & Legal Notice
This laboratory design is intended **solely for educational purposes and authorized security research**.
*   **Do not** use this environment to analyze malware you are not authorized to possess.
*   **Do not** use these techniques to launch attacks.
*   **Do not** run this in a production enterprise environment without strict hardening.

### Threat Model: What we assume
1.  **Shared Kernel:** Unlike VMs, containers share the host kernel. A vulnerability in the Linux kernel (zero-day) could allow a container escape.
2.  **Rootless Mitigation:** Even if an escape occurs, the attacker gains access only to the unprivileged user's context, not the host's root.
3.  **Persistence:** The environment is ephemeral. We assume the malware cannot persist across container destructions unless it writes to a mounted volume.

**This lab DOES NOT replace an air-gapped machine for analyzing high-risk, kernel-level rootkits.**

---

## 3. Introduction

Malware analysis demands **highly isolated** environments where mistakes do not compromise the entire host system. Containers offer a lightweight way to encapsulate processes, provided they meet specific requirements:

- **Rootless:** No root privileges on the host.
- **Multi-network:** Support for multiple virtual networks to simulate real-world environments.
- **Disposable:** Easy to destroy and recreate after every experiment.

---

## 4. Architecture & Design

### 4.1 Visual Architecture

```mermaid
flowchart LR
    subgraph Host [Arch Linux Host]
        direction TB
        P1[Podman Rootless Daemon]
    end

    subgraph Network [Virtual Networks]
        LAN[netLAN 10.90.0.0/24]
        WAN[netWAN 10.91.0.0/24]
        LAB[netLAB (Isolated)]
    end

    subgraph Containers [User Namespace]
        C1[Container: REMnux/Malware]
        C2[Container: Tools/Listener]
    end

    Host --> P1
    P1 --> C1
    P1 --> C2
    
    C1 <--> LAN
    C1 <--> LAB
    C2 <--> LAB
```

### 4.2 Key Concepts
*   **Rootless Containers:** The container sees an internal root, but it maps to an unprivileged UID on the host.
*   **Namespaces:** We isolate Users, Network, PID, and Mounts.
*   **Multi-Segment:** Simulating complex topologies (e.g., C1 talks to C2 via a private "Darknet" while C1 thinks it's on the internet).

---

## 5. Recommended Repository Structure

To turn this research into a reproducible project, organize your directory as follows:

```text
podman-isolated-labs/
  ├── docs/
  │   ├── README.md                # Main documentation
  │   ├── threat-model.md          # Detailed security assumptions
  │   └── cheat-sheet.md           # Podman quick commands
  ├── lab/
  │   ├── networks.sh              # Creates netLAN, netWAN, netLAB
  │   ├── run-remnux.sh            # Launches the REMnux container
  │   └── cleanup.sh               # Destroys containers/networks
  ├── reports/
  │   └── template-experiment.md   # Standardized log for each analysis
  └── benchmarks/
      └── results.md               # Performance data
```

---

## 6. Host Preparation (Arch Linux)

### 6.1 Enable User Namespaces
```bash
# Check support (should be y)
zgrep CONFIG_USER_NS /proc/config.gz

# Allow unprivileged creation
echo 'kernel.unprivileged_userns_clone=1' | sudo tee /etc/sysctl.d/userns.conf
```

### 6.2 Sub-UID/GID Ranges
```bash
sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 $USER
```
*Log out/in required.*

### 6.3 Installation
```bash
sudo pacman -S podman crun slirp4netns netavark
```

---

## 7. Operational Playbooks

Recipes for common analysis scenarios.

### Playbook A: Rapid Static Analysis
**Goal:** Identify basic properties (strings, hash, file type) without execution.

1.  **Prepare:** Place sample in `~/malware/sample.exe`.
2.  **Run:**
    ```bash
    podman run --rm -it \
      --read-only \
      -v ~/malware:/samples:ro \
      remnux/remnux-distro:focal bash
    ```
3.  **Analyze (Inside):**
    ```bash
    cd /samples
    sha256sum sample.exe
    floss sample.exe > strings.txt  # Extract obfuscated strings
    peframe sample.exe              # Static PE analysis
    ```
4.  **Cleanup:** Exit shell (auto-destroys due to `--rm`).

### Playbook B: Dynamic Analysis with Traffic Capture
**Goal:** Execute malware and capture network beacons.

1.  **Setup Networks:**
    ```bash
    podman network create netLAB --internal
    ```
2.  **Start Listener (Fake Internet):**
    ```bash
    podman run -d --name listener --network netLAB alpine nc -lk -p 80
    ```
3.  **Start Sniffer (Host Side):**
    Identify the bridge interface for `netLAB` and run:
    ```bash
    sudo tcpdump -i <bridge_interface> -w capture.pcap
    ```
4.  **Run Malware:**
    ```bash
    podman run --rm -it --network netLAB \
      -v ~/malware:/samples:ro \
      remnux/remnux-distro:focal \
      wine /samples/sample.exe
    ```
5.  **Interpret:** Check `capture.pcap` for DNS queries or HTTP requests to the listener.

### Playbook C: Comparing Samples (A/B Testing)
**Goal:** Run two variants in parallel on isolated networks.

1.  **Create 2 Networks:** `netA` and `netB`.
2.  **Launch Variant A:** attached to `netA`.
3.  **Launch Variant B:** attached to `netB`.
4.  **Compare:** Use `podman stats` to see which variant consumes more CPU/RAM (potential crypto-mining vs. keylogging).

---

## 8. Experiment Report Template

Use this template to log your findings.

```markdown
### 🧪 Experiment Report
**ID:** LAB-20251205-01
**Analyst:** Livey

#### 1. Sample Data
*   **Filename:** invoice_urgent.exe
*   **Hash (SHA256):** e3b0c44298...
*   **Source:** MalwareBazaar

#### 2. Environment
*   **Image:** `remnux/remnux-distro:focal`
*   **Networks:** `netLAB` (Isolated)
*   **Tools:** `wine`, `tcpdump`, `floss`

#### 3. Static Observations
*   **Packer:** UPX detected.
*   **Suspicious Strings:** `powershell.exe`, `DownloadString`, `192.168.1.X`

#### 4. Dynamic Behavior
*   **Network:** Attempted DNS resolution for `update-windows-kernel.com`.
*   **Files:** Created `C:\temp\drop.bat` (simulated).

#### 5. Artifacts
*   [ ] Pcap saved: `logs/20251205-01.pcap`
*   [ ] IOC List generated.

#### 6. Conclusion
Likely a standard dropper/downloader. Safe to destroy.
```

---

## 9. Logs & Metrics

**Container Logs:**
```bash
podman logs -f <container_name>
```

**Real-time Resource Usage:**
```bash
podman stats --no-stream
```
*Tip: High CPU usage often indicates mining or unpacking routines.*

---

## 10. Troubleshooting / FAQ

**Q: "Error: could not get runtime dir"**
*A:* Ensure `XDG_RUNTIME_DIR` is set. Usually happens if you `su` into a user instead of logging in.

**Q: "Containers can't see each other."**
*A:* Check firewall rules (`ufw`/`iptables`) on the host. Podman needs permission to route between bridge interfaces.

**Q: "Permission denied mounting volumes."**
*A:* SElinux/AppArmor might be blocking. Use the `:z` or `:Z` flag on volumes if using SELinux, or ensure the host path is readable by the remapped user ID.

---

## 11. Known Limitations

*   **Kernel Exploits:** Cannot protect against malware specifically targeting Linux kernel vulnerabilities.
*   **Rootkits:** Not suitable for analyzing ring-0 rootkits.
*   **Windows Native:** Requires `wine` or Mono; cannot run native Windows kernel drivers.
*   **Air-Gap:** This is software isolation. For state-sponsored threats, use physical air-gaps.

---

## 12. Ecosystem Integration

This lab is designed to work within the **Livey** ecosystem:

*   **Future Integration:**
    *   **Livey-Codex-Toolkit:** Automate playbook generation and report parsing.
    *   **AetherFrame:** Use this lab as a backend execution node for the AetherFrame intelligence network.
    *   **CLI Automation:** A planned `codex lab up` command to spin up the entire topology instantly.

---

## 13. Appendices

### Cheat Sheet
*   `podman system prune -a`: Nuclear option (deletes all stopped containers/images).
*   `podman inspect <id>`: JSON details about IP/Mounts.
*   `podman network ls`: List active networks.

### Glossary
*   **Rootless:** Running containers without daemon root privileges.
*   **C2:** Command and Control server.
*   **IOC:** Indicator of Compromise (IP, Hash, Domain).