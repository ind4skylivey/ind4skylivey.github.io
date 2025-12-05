---
layout: default
title: "Rootless Escape Resilience: Testing Container Isolation"
description: "An in-depth analysis of escape resilience in rootless Podman containers on Arch Linux, featuring threat modeling, stress testing, and hardening."
permalink: /research/rootless-escape-resilience/
---

# Rootless Escape Resilience
## Evaluating Container Escape Resistance in Rootless Podman Labs

---

> **PROJECT STATUS:** `ACTIVE` 🟢
> **HOST:** Arch Linux · **ENGINE:** Podman (Rootless)
> **FOCUS:** Container Security · Isolation Audit · Hardening
> ![Arch](https://img.shields.io/badge/Arch_Linux-Distro-1793d1?style=flat-square&logo=arch-linux&logoColor=white) ![Podman](https://img.shields.io/badge/Podman-Rootless-892ca0?style=flat-square&logo=podman&logoColor=white)

### ⚡ TL;DR

Container-based malware labs often operate under a dangerous assumption: "*It runs in a container, so it's fine.*"
**Spoiler:** It is not always fine.

This research does not teach how to exploit containers. Instead, it defines a **practical methodology to evaluate, document, and improve escape resilience** in a `rootless` environment. We model risk and measure the strength of the cage without needing chaotic kernel exploitation.

---

## 1. Objective

Design a **resilience framework** to answer:
> "How difficult would it be for malware with arbitrary code execution capabilities inside a rootless container to compromise the host?"

We achieve this without CVE PoCs or attack instructions, but by:
*   Inspecting attack surfaces.
*   Measuring host resource exposure.
*   Testing reasonable limits (CPU, RAM, Filesystem).
*   Conceptually comparing rootfull vs. rootless.
*   Recommending additional hardening.

---

## 2. Threat Model

### 2.1 Assumptions
*   The container executes potentially malicious code (malware, payload, arbitrary shell).
*   The container is **NOT** `--privileged`.
*   **Podman Rootless** is used: no root daemon on the host.
*   Mounted volumes are restricted to controlled paths (no `/`, `/boot`, `/etc`).
*   The kernel may have vulnerabilities, but *we will not exploit them*; we assume they exist.

### 2.2 Definition of "Escape"
For this research, a successful escape occurs if an attacker inside the container can:
*   Write to host paths outside declared volumes.
*   Read sensitive host files (keys, configs, user home) not explicitly exposed.
*   Execute processes directly in the host's PID namespace.
*   Manipulate host network interfaces.
*   Persist artifacts on the host outside mounted directories.

> ⚠️ **Ethical & Security Notice:**
> This research focuses on **exposure detection and hardening**, not on breaking containers. No exploits are executed, no CVEs are reproduced, and no offensive guidance is provided.

---

## 3. Base Architecture

### 3.1 Stack
*   **Host:** Arch Linux (modern kernel, cgroups v2).
*   **Runtime:** Podman + crun.
*   **Mode:** Rootless (`podman info` → `rootless: true`).
*   **Network:** `slirp4netns` / `netavark` (user mode).
*   **Extra Security:** AppArmor / SELinux, default seccomp.

### 3.2 Architecture Diagram (Mermaid)

```mermaid
flowchart TD
    subgraph HOST [Arch Linux Host]
      K[Linux Kernel]
      subgraph USERSPACE [User Space]
        U[Normal User (UID 1000)]
        P[Podman Rootless]
      end
    end

    subgraph CT [Container Namespace]
      NSU[User NS (root mapped to 100000+)]
      NSP[PID NS]
      NSN[Network NS]
      NSM[Mount NS]
      PROC[Malware / App]
    end

    U --> P
    P --> CT
    PROC --> NSU
    PROC --> NSP
    PROC --> NSN
    PROC --> NSM
    K --> HOST
```

**Key Concept:** `root` inside the container ≠ `root` on the host. Internal root is mapped to unprivileged IDs.

---

## 4. Evaluation Methodology (Non-Exploitative)

1.  **Internal Capability Inspection:** What can the process actually do?
2.  **Host Visibility:** What parts of the host are visible/mounted?
3.  **Controlled Resource Abuse:** Can the container crash the host via CPU/RAM/IO?
4.  **Comparative Hardening:** Applying restrictions and measuring impact.

---

## 5. Experiment 1: Capabilities & Privileges

### 5.1 Launch Rootless Test Container

```bash
podman run --rm -it --name escape-check \
  --security-opt=no-new-privileges \
  --cap-drop=ALL \
  alpine sh
```

**Inside the container:**
```bash
id
uname -a
grep Cap /proc/self/status
```

**Interpretation:**
*   `id` shows `uid=0(root)` inside, but it is remapped.
*   `CapEff`, `CapPrm` should be `00000000...` if `--cap-drop=ALL` worked.
*   If active capabilities exist, document them and justify their necessity.

> 💡 **Research Idea:** Repeat without `--cap-drop=ALL` and compare. Document extra capabilities (e.g., `CAP_NET_RAW`, `CAP_SYS_ADMIN`) and their implications.

---

## 6. Experiment 2: Host Filesystem Visibility

**Objective:** Verify what the container can actually see.

**Inside the container:**
```bash
ls /
ls /proc
ls /sys
ls /dev
findmnt
mount
```

**Questions to Answer:**
*   Are there strange paths like `/run/user/1000` or `/home`?
*   Are only declared volumes mounted?
*   Does `/dev` contain critical host devices or only safe pseudo-devices?

> ⚠️ **Red Alert:** If you can see `/home/user` without explicitly mounting it, check your configuration immediately.

### 6.1 Read-Only Rootfs Test

```bash
podman run --rm -it \
  --read-only \
  -v ./sandbox:/sandbox:rw \
  alpine sh
```

**Inside:**
```bash
touch /rootfs-test        # Should fail
touch /sandbox/test-ok    # Should succeed
```
This proves only the declared volume is writable.

---

## 7. Experiment 3: Controlled Resource Abuse (DoS)

We aim to see if the container can consume excessive resources, not crash the host.

### 7.1 No Limits

```bash
podman run --rm -it --name stress-no-limit alpine sh
# Inside:
yes > /dev/null &
yes > /dev/null &
yes > /dev/null &
```

**Observe on Host:** `podman stats` and `htop`.

### 7.2 With Cgroups (Limited CPU/RAM)

```bash
podman run --rm -it \
  --name stress-limited \
  --memory 256m \
  --cpus 0.5 \
  alpine sh
```

**Compare:**
*   Does the host remain usable?
*   Does Podman kill the container on OOM?
*   Is host CPU usage reasonable?

**Benchmark Log Example:**
*   **No Limits:** Host CPU spiked to 95%, UI sluggish.
*   **With Limits (256M / 0.5 CPU):** Host responsive, container killed at OOM.

---

## 8. Experiment 4: Rootless vs. Rootfull Comparison

### Conceptual Table

| Aspect | Rootfull Docker/Podman | Rootless Podman |
| :--- | :--- | :--- |
| **Daemon** | root (Docker) / root (Podman) | User process, no root daemon |
| **User NS** | Optional | Mandatory |
| **Kernel Surface** | Larger (Daemon + Containers) | Smaller (No root daemon) |
| **Default Volumes** | `/var/lib/...` | `$HOME/.local/share/containers/...` |
| **Escape Risk** | High impact if successful | Impact limited to host user |

---

## 9. Experiment 5: Attack Surface Profiling

Understand what an attacker *could* exploit if a kernel bug existed.

### 9.1 Syscall Enumeration (Conceptual)

Use `strace` inside the container:
```bash
apk add --no-cache strace
strace -f -o trace.log ./app
```
*   Does it use mount syscalls (`mount`, `pivot_root`)?
*   Does it manipulate `/proc` or `/sys`?
*   Does it try to open devices (`/dev/...`)?

### 9.2 Seccomp Validation
Confirm the default profile is active. Research involves reducing the allowed syscalls further for specific workloads.

---

## 10. Recommended Hardening (The "Healthy Paranoia" Profile)

*   [ ] `--read-only` for rootfs; explicit `:rw` volumes only.
*   [ ] `--cap-drop=ALL`; add only strictly necessary caps.
*   [ ] `--security-opt=no-new-privileges`.
*   [ ] Limit CPU and Memory (`--cpus`, `--memory`).
*   [ ] Never mount sensitive sockets (e.g., host Docker sock).
*   [ ] Mount data in dedicated subdirectories, never the full `$HOME`.
*   [ ] Use minimalist images (Alpine, Distroless).
*   [ ] Enable/Document AppArmor/SELinux.

---

## 11. Rootless Escape Resilience Report Template

```markdown
# Rootless Escape Resilience Report

**Host:** Arch Linux (Kernel X.Y.Z)
**Runtime:** Podman Rootless (Version X.Y)
**Image:** alpine:latest

## 1. Capabilities Check
- CapEff: 0000000000000000
- Extra Caps: None

## 2. Filesystem Visibility
- Host Paths: /, /proc, /sys, /dev
- Volumes: ./sandbox (rw), no sensitive mounts

## 3. Resource Abuse
- No Limits: CPU Spike detected
- With Cgroups: Host stable

## 4. Namespace Isolation
- PID/Net/User NS: Isolated correctly

## 5. Findings
- [ ] Sensitive Volume Mounted
- [ ] Extra Capabilities Present
- [ ] Permissive Seccomp

## 6. Conclusion
Brief summary of perceived resilience.
```

---

## 12. Conclusion

This research shows that:

*   **Rootless is not invulnerable**, but it drastically reduces escape impact.
*   It eliminates the root daemon as a central target.
*   It enforces User Namespaces.

Resilience depends heavily on **volume mounts**, **capabilities**, **resource limits**, and **unexposed sockets**. It is possible to evaluate escape resistance **without a single exploit**, purely by inspecting exposure.

**Rootless Escape Resilience** is not an "Invincible" stamp. It is a continuous process of **Observe → Measure → Restrict → Document → Reinforce**.

---

## 13. Future Work

*   Create an automated scanner to run these checks.
*   Compare different Kernels/Distros for default isolation.
*   Integrate this evaluation into CI/CD pipelines.
*   Combine with **Podman Isolated Labs** and **Multi-Network Cyberdecks** for a complete secure research ecosystem.