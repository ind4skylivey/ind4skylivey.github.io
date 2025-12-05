---
layout: default
title: "Podman Isolated Labs"
description: "Rootless, Multi-Network Containers for Malware Analysis and Secure Research"
permalink: /research/podman-isolated-labs/
---

# Podman Isolated Labs
## Rootless, Multi-Network Containers for Malware Analysis and Secure Research

---

## 1. Introduction

Malware analysis demands **highly isolated** environments where mistakes do not compromise the entire host system.

Containers offer a lightweight way to encapsulate processes, but they must meet specific requirements:

- **Rootless:** No root privileges on the host.
- **Multi-network:** Support for multiple virtual networks to simulate real-world environments.
- **Disposable:** Easy to destroy and recreate after every experiment.

This document outlines the design of **Podman Isolated Labs**, built upon:

- **Host:** Arch Linux
- **Containers:** Podman in rootless mode
- **Objective:** Malware analysis and security research in a secure, reproducible environment.

This approach is designed for:
- Cybersecurity professionals and Red Teamers.
- Intermediate developers seeking a serious yet understandable experimentation environment.

---

## 2. Lab Objectives

1. **Educate and demonstrate** a concrete technique for setting up malware labs using Podman.
2. Execute malware within rootless containers without compromising the host.
3. Establish **multiple network segments** (LAN, WAN, "Simulated Internet") for behavioral analysis.
4. Collect **logs, traces, and metrics** from each experiment.
5. Maintain a workflow that is:
   - Reproducible,
   - Auditable,
   - And easy to destroy/clean.

---

## 3. General Architecture

### 3.1 High-Level View

```text
+------------------------------------------------------+
|                    Arch Linux Host                   |
|                                                      |
|  +----------------------+   +----------------------+ |
|  |  Podman Rootless     |   |  Podman Rootless     | |
|  |  (User Namespace)    |   |  (User Namespace)    | |
|  |                      |   |                      | |
|  |  +-------------+     |   |  +-------------+     | |
|  |  |  Malware    |     |   |  |  Tools      |     | |
|  |  |  Sandbox    |     |   |  |  (REMnux,   |     | |
|  |  +-------------+     |   |  |  custom)    |     | |
|  |   netLAN / netWAN    |   |   netLAB       |     | |
|  +----------------------+   +----------------------+ |
|         \         /                 |                |
|          \       /     Multi-network bridges        |
+------------------------------------------------------+
```

### 3.2 Key Concepts

**Rootless Containers**
The container sees an internal root, but this root is mapped to an unprivileged UID on the host.

**Linux Namespaces**
We isolate:
- Users (user namespace)
- Network (network namespace)
- Processes (PID)
- File System (mount)

**Multiple Networks**
We create several virtual networks (`netLAN`, `netWAN`, etc.) to simulate different scenarios:
- Totally isolated lab
- Segment with limited egress
- Controlled "Internet"

---

## 4. Host Preparation (Arch Linux)

### 4.1 Enable User Namespaces

Check support:

```bash
zgrep CONFIG_USER_NS /proc/config.gz
# Should show: CONFIG_USER_NS=y
```

Allow unprivileged namespace creation:

```bash
sudo sysctl -w kernel.unprivileged_userns_clone=1
echo 'kernel.unprivileged_userns_clone=1' | sudo tee /etc/sysctl.d/userns.conf
```

### 4.2 Sub-UID and Sub-GID Ranges

Assign ranges to your user (example):

```bash
sudo touch /etc/subuid /etc/subgid
sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 $USER
```

*Log out and log back in for changes to take effect.*

### 4.3 Installing Podman and Tools

```bash
sudo pacman -Syu
sudo pacman -S podman crun slirp4netns netavark
```

Check general info:

```bash
podman info
```

**Points to verify:**
- `rootless: true` when running as your user.
- `networkBackend`: `netavark` or similar.
- `store`: Located in your `$HOME`, not `/var/lib/...`.

---

## 5. Getting Started with Rootless Podman

### 5.1 Minimal Container

```bash
podman run --rm -it alpine sh
```

```text
/ # echo "Hello from a rootless container"
Hello from a rootless container
```

Observe from another terminal:

```bash
podman ps
podman top <CONTAINER_ID>
```

You will see that, on the host, the processes are not root, even though they appear as root inside the container.

### 5.2 Analysis Image (Example: REMnux)

```bash
podman pull docker.io/remnux/remnux-distro:focal

podman run --rm -it \
  --name remnux-lab \
  -u remnux \
  remnux/remnux-distro:focal bash
```

Inside, you will have typical malware analysis tools (THUG, disassemblers, etc.).

---

## 6. Multi-Segment Networks with Podman

### 6.1 Create Isolated Networks

```bash
podman network create netLAN --subnet 10.90.0.0/24
podman network create netWAN --subnet 10.91.0.0/24
```

Optional: Completely internal network (no host egress):

```bash
podman network create \
  --subnet 10.92.0.0/24 \
  --internal \
  netLAB
```

### 6.2 Connect a Container to Multiple Networks

```bash
podman run --rm -it \
  --name malware-sandbox \
  --network netLAN \
  --network netLAB \
  alpine sh
```

Inside the container:

```bash
ip a
# You should see multiple interfaces: eth0 (netLAN), eth1 (netLAB), etc.
```

### 6.3 rp_filter and Connectivity

If you notice strange behavior with multiple interfaces (dropped packets):

```bash
sudo sysctl -w net.ipv4.conf.all.rp_filter=2
echo "net.ipv4.conf.all.rp_filter=2" | sudo tee -a /etc/sysctl.conf
```

---

## 7. Isolation and Hardening

### 7.1 Rootless + User Namespaces

This is the core of the security model:
- Inside the container: You have UID 0.
- On the host: That UID 0 is mapped to a "powerless" UID (via `/etc/subuid` range).
- **Result:** Even if malware gains "root" inside the container, it is not root on the host.

### 7.2 Read-Only File System

To prevent persistence and unwanted modifications:

```bash
podman run --rm -it \
  --name malware-sandbox \
  --read-only \
  -v /home/livey/malware:/samples:ro \
  --network netLAB \
  remnux/remnux-distro:focal bash
```

- `--read-only`: Container rootfs is read-only.
- `:ro` on volume: Samples cannot be modified from within.

### 7.3 Minimizing Capabilities

```bash
podman run --rm -it \
  --cap-drop ALL \
  --cap-add NET_RAW \
  --read-only \
  ...
```

Start with `--cap-drop ALL`. Add only what is strictly necessary (e.g., `NET_RAW` if you need network tools to work).

### 7.4 Seccomp / AppArmor / SELinux (Optional)

Use a default or custom seccomp profile:

```bash
podman run --security-opt seccomp=/path/to/profile.json ...
```

Activate AppArmor/SELinux on the host with restrictive profiles for Podman.

---

## 8. Practical Malware Analysis Workflow

### 8.1 Obtain Samples (Legally and Safely)

Typical sources (always respect their terms):
- MalwareBazaar
- VirusShare

Example storage:
```text
/home/livey/malware/
  ├── sample1.exe
  ├── sample2.bin
  └── README.txt  (notes)
```

### 8.2 Launch Analysis Container

```bash
podman run --rm -it \
  --name remnux-malware-lab \
  --read-only \
  -v /home/livey/malware:/samples:ro \
  --network netLAB \
  remnux/remnux-distro:focal bash
```

### 8.3 Static Analysis Inside Container

```bash
cd /samples

file sample1.exe
sha256sum sample1.exe
strings sample1.exe | head -n 40
```

Complement with disassemblers, YARA tools, Packer detectors, etc.

### 8.4 Controlled Dynamic Analysis

Generic example (pseudo-command):

```bash
# Run inside a sandbox in REMnux / wine / emulator
# (depends on your stack inside the container)
./run_in_sandbox sample1.exe
```

Meanwhile, from the host:

```bash
podman logs -f remnux-malware-lab
podman stats remnux-malware-lab
```

And, if desired, capture traffic on the host:

```bash
sudo tcpdump -i any host 10.92.0.10 -w capture.pcap
```

*(Replace IP with container IP in netLAB)*

### 8.5 Teardown: Destroy Everything

The container is automatically removed with `--rm`. 
To clean networks if no longer needed:

```bash
podman network rm netLAN netWAN netLAB
podman image prune
podman network prune
```

---

## 9. Logs and Metrics

### 9.1 Container Logs

```bash
podman logs remnux-malware-lab
```

Example (simplified):
```text
[2025-01-10 03:21:00] Starting dynamic analysis for sample1.exe
[2025-01-10 03:21:05] DNS query: evil.domain.test
[2025-01-10 03:21:07] HTTP POST to 10.91.0.50:8080
[2025-01-10 03:21:10] Suspicious mutex created: Global\{A1B2C3D4-...
[2025-01-10 03:21:15] Analysis finished, report stored at /reports/sample1.json
```

### 9.2 Quick Metrics

```bash
podman stats remnux-malware-lab
```

Output:
```text
ID           NAME                 CPU %   MEM USAGE / LIMIT   NET IO           BLOCK IO
a1b2c3d4e5   remnux-malware-lab   24.3%   560MiB / 4GiB       10MB / 2MB       30MB / 12MB
```
Save these metrics as part of each experiment's report.

---

## 10. Performance (Benchmarks)

In multiple studies and internal tests:
- Podman overhead vs. host execution is typically low (around 5–10% in intensive loads).
- For malware analysis tools (not extreme HPC), the practical difference is negligible.

Typical comparison scheme you can replicate:
Task: Scan 1 GB of samples with Tool X

- **Bare-metal:** 100 s (reference)
- **Podman rootless:** 105 s (≈ +5%)

**Recommendation:** Generate your own benchmarks.

```bash
time podman run --rm ... <your_analysis_command>
```

Save results in a `benchmarks.md` file within the repo/lab.

---

## 11. General Best Practices

- **Never** use this lab on the same machine where you store critical data without backups.
- Execute everything as a **normal user**, never as root on the host.
- Always use:
  - `--rm`
  - `--read-only`
  - `:ro` volumes for samples
  - Minimal capabilities (`--cap-drop ALL`)
- Maintain an **experiment journal**:
  - Sample hash
  - Date/Time
  - Image used
  - Active networks
  - Generated logs and pcaps
- Regularly update Podman, kernel, and base images.
- If sharing results, avoid uploading real samples; share only hashes and metadata.

---

## 12. Useful References

**Podman**
- Official Docs: [https://podman.io/](https://podman.io/)
- Arch Wiki (Podman): [https://wiki.archlinux.org/title/Podman](https://wiki.archlinux.org/title/Podman)

**Namespaces and Rootless Containers**
- Rootless containers overview: [https://rootlesscontaine.rs/](https://rootlesscontaine.rs/)

**Labs / Malware Analysis**
- REMnux: [https://remnux.org/](https://remnux.org/)
- MalwareBazaar: [https://bazaar.abuse.ch/](https://bazaar.abuse.ch/)
- VirusShare: [https://virusshare.com/](https://virusshare.com/)

---

## 13. Future Work

Research lines to extend from this lab:
- Integrate this environment with CI/CD to run samples in controlled pipelines.
- Experiment with LLMs to:
  - Summarize logs.
  - Classify behaviors.
  - Suggest Indicators of Compromise (IoCs).
- Add a web dashboard (read-only) to visualize:
  - Network topology.
  - Active containers.
  - Analysis statistics per sample.

**Podman Isolated Labs** is just the foundation; from here, you can build your own "black box" for offensive/defensive research in an environment that respects the principle:
*Experiment hard, break things… but only inside the sandbox.*