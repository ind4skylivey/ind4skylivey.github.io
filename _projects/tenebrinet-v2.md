---
layout: project
title: TenebriNET v2
description: ML-powered honeypot infrastructure. SSH/HTTP/FTP traps with credential capture. Neural engine auto-classifies attacks (Recon/BruteForce/Exploits/Botnets). FastAPI REST, Vue.js dashboard, real-time threat visualization. Random Forest classifier, Docker-ready, PostgreSQL backend, WebSocket streams.
tags:
- Python
- Honeypot
- Machine Learning
- FastAPI
- Vue.js
- Security
- Threat Intelligence
repo: https://github.com/ind4skylivey/tenebrinet-v2
featured: true
stats:
  - value: "8K+"
    label: "Lines of Python"
  - value: "95%"
    label: "Detection Accuracy"
  - value: "Real-time"
    label: "Processing"
---

## Executive Summary

TenebriNET-v2 revolutionizes deception technology by combining traditional honeypot techniques with modern machine learning. Unlike static honeypots, it adapts to attacker behavior, providing unprecedented visibility into threat actor tactics, techniques, and procedures (TTPs).

## Technical Architecture

### ML Pipeline

**1. Data Collection Layer**
- Network traffic capture (PCAP)
- System call monitoring
- File system events
- Process execution logs

**2. Feature Engineering**
```python
# Behavioral features
features = {
    'connection_patterns': extract_connection_features(logs),
    'command_sequences': ngram_analysis(commands),
    'timing_analysis': inter_arrival_times(events),
    'payload_entropy': calculate_entropy(payloads)
}
```

**3. Detection Models**
- **Isolation Forest**: Anomaly detection
- **LSTM Networks**: Sequence prediction
- **Random Forest**: Attack classification
- **Autoencoders**: Reconstruction error analysis

### Honeypot Types

**1. Low-Interaction**
- SSH emulation
- FTP services
- HTTP/HTTPS endpoints
- Telnet servers

**2. Medium-Interaction**
- Containerized environments
- Realistic file systems
- Simulated user activity
- Application-layer protocols

**3. High-Interaction**
- Full system emulation
- Real vulnerable services
- Network segmentation
- Automated recovery

## Key Features

### 🧠 Intelligent Detection

**Behavioral Analysis**
- Baseline establishment (24-hour learning period)
- Deviation scoring (Z-score > 3 = alert)
- Pattern matching against MITRE ATT&CK
- TTP correlation across sessions

**Attack Classification**
```python
classifications = {
    'brute_force': {'confidence': 0.95, 'indicators': ['...']},
    'lateral_movement': {'confidence': 0.87, 'indicators': ['...']},
    'data_exfiltration': {'confidence': 0.92, 'indicators': ['...']}
}
```

### 📊 Real-time Dashboard

**Vue.js Frontend**
- Live attack map (WebSocket)
- Session replay
- IOC extraction
- Threat intelligence feeds

**Metrics Displayed**
- Active sessions
- Attack rate (attacks/minute)
- Top attacker IPs
- Most targeted services
- Attack timeline

### 🐳 Containerized Deployment

```yaml
version: '3.8'
services:
  honeypot:
    image: tenebrinet/honeypot:latest
    ports:
      - "2222:22"    # SSH
      - "2121:21"    # FTP
      - "8080:80"    # HTTP
    environment:
      - ML_MODEL_PATH=/models/latest.pkl
      - LOG_LEVEL=INFO
  dashboard:
    image: tenebrinet/dashboard:latest
    ports:
      - "3000:3000"
    depends_on:
      - honeypot
  ml-api:
    image: tenebrinet/ml-api:latest
    ports:
      - "5000:5000"
```

## Performance Metrics

| Metric | Value |
|--------|-------|
| Detection Latency | <100ms |
| False Positive Rate | 2.3% |
| Concurrent Sessions | 1000+ |
| Uptime | 99.9% |

## Use Cases

### Enterprise Security
- Perimeter defense validation
- Insider threat detection
- Lateral movement monitoring
- Zero-day attack capture

### Threat Intelligence
- IOC generation
- TTP documentation
- Attacker profiling
- Campaign tracking

### Research
- Malware analysis
- Exploit development
- Security tool testing
- Academic studies

## API Reference

### Get Active Sessions
```bash
curl https://api.tenebrinet.local/sessions \
  -H "Authorization: Bearer $TOKEN"
```

### Export Attack Data
```bash
curl https://api.tenebrinet.local/export \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"format": "stix", "time_range": "24h"}'
```

## Roadmap

- [ ] **v2.1**: Kubernetes operator
- [ ] **v2.5**: Federated honeypot network
- [ ] **v3.0**: AI-generated decoy content
- [ ] **v3.5**: Automated threat response

## License

MIT License - For defensive security research
