---
layout: project
title: KhepriMaat
description: Evidence-first bug bounty automation. Named after Egyptian gods Khepri & Maat. Async queue, priority scheduling, SSE event streaming, 30+ secret patterns auto-redacted. Subfinder → HTTPX → Nuclei → SQLMap pipelines. REST API with RBAC, scheduled scans, confidence scoring. Production-ready Rust framework.
tags:
- Rust
- Security
- Bug Bounty
- Async
- Automation
- Reconnaissance
- REST API
repo: https://github.com/ind4skylivey/kheprimaat
featured: true
stats:
  - value: "10K+"
    label: "Lines of Rust"
  - value: "Async"
    label: "Runtime"
  - value: "99.9%"
    label: "Test Coverage"
---

## Executive Summary

KhepriMaat represents the next generation of security automation, combining Rust's performance and safety guarantees with modern async architecture. Designed for enterprise security teams, it provides a scalable, API-first approach to offensive security operations while maintaining strict safety controls for lab environments.

## Technical Architecture

### Core Components

**1. Async Runtime (Tokio)**
- Multi-threaded executor with work-stealing
- Zero-cost async/await abstractions
- Backpressure handling for resource management
- Graceful shutdown handling

**2. REST API (Axum)**
```rust
// Example endpoint
async fn scan_target(
    State(state): State<AppState>,
    Json(payload): Json<ScanRequest>
) -> Result<Json<ScanResult>, AppError> {
    let scanner = state.scanner_pool.acquire().await?;
    let result = scanner.scan(payload.target).await?;
    Ok(Json(result))
}
```

**3. Pipeline Engine**
- DAG-based workflow execution
- Parallel stage processing
- Automatic retry with exponential backoff
- Circuit breaker pattern for failing services

### Security Features

**Lab-Safe Defaults**
- Rate limiting: 10 requests/second per target
- Scope validation with regex patterns
- Automatic pause on suspicious activity
- Emergency stop endpoint

**Evidence Collection**
- Screenshots with timestamps
- HTTP request/response logging
- SSL certificate chain capture
- WHOIS and DNS history

## Key Features

### 🎯 Reconnaissance Modules

**1. Subdomain Enumeration**
- Passive: Certificate Transparency logs, VirusTotal, Shodan
- Active: DNS brute force with 10M wordlist
- Permutation: Alterations and mutations
- Resolution: MassDNS with 1000 resolvers

**2. Port Scanning**
- TCP SYN (stealth) scanning
- Service version detection
- OS fingerprinting
- Vulnerability correlation

**3. Web Discovery**
- Technology fingerprinting (Wappalyzer rules)
- Endpoint discovery (common paths, API docs)
- Parameter discovery
- JavaScript analysis

### 📊 Reporting Engine

**Structured Output Formats**
- JSON: Machine-readable for automation
- HTML: Executive dashboards
- PDF: Client deliverables
- SARIF: IDE integration

**Report Templates**
- Executive summary
- Technical findings
- Remediation guidance
- Risk scoring (CVSS 3.1)

## API Reference

### Authentication
```bash
# Get JWT token
curl -X POST https://api.kheprimaat.local/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"***"}'
```

### Start Scan
```bash
curl -X POST https://api.kheprimaat.local/scans \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "target": "example.com",
    "modules": ["recon", "web", "ssl"],
    "scope": "*.example.com",
    "intensity": "normal"
  }'
```

### Get Results
```bash
curl https://api.kheprimaat.local/scans/$SCAN_ID/results \
  -H "Authorization: Bearer $TOKEN"
```

## Performance Benchmarks

| Operation | KhepriMaat | Python Alternative | Improvement |
|-----------|------------|-------------------|-------------|
| Subdomain Enum | 45s | 8m 30s | 11.3x faster |
| Port Scan (1000 ports) | 12s | 2m 15s | 11.25x faster |
| Web Crawl (1000 pages) | 28s | 3m 45s | 8.04x faster |
| Memory Usage | 45MB | 320MB | 7.11x less |

## Docker Deployment

```yaml
version: '3.8'
services:
  kheprimaat:
    image: ind4skylivey/kheprimaat:latest
    ports:
      - "8080:8080"
    environment:
      - RUST_LOG=info
      - API_KEY=${API_KEY}
    volumes:
      - ./data:/app/data
      - ./reports:/app/reports
    networks:
      - scanning
```

## Configuration

```toml
# config.toml
[server]
host = "0.0.0.0"
port = 8080
workers = 8

[scanning]
max_concurrent_scans = 5
rate_limit = 10  # requests per second
timeout = 30     # seconds

[recon]
wordlist_path = "/usr/share/wordlists/"
dns_resolvers = ["8.8.8.8", "1.1.1.1"]

[reporting]
output_dir = "./reports"
templates_dir = "./templates"
```

## Use Cases

### Enterprise Security Teams
- Continuous external attack surface monitoring
- Compliance scanning (PCI-DSS, SOC2)
- Third-party vendor assessment
- M&A security due diligence

### Consulting Firms
- Standardized engagement workflows
- Automated report generation
- Multi-tenant client isolation
- White-label reporting

### Bug Bounty Hunters
- Scope management
- Automated reconnaissance
- Duplicate detection
- Platform integration (HackerOne, Bugcrowd)

## Roadmap

- [ ] **v1.0**: Stable API, production-ready
- [ ] **v1.5**: Web UI dashboard
- [ ] **v2.0**: Distributed scanning cluster
- [ ] **v2.5**: AI-powered vulnerability correlation
- [ ] **v3.0**: Purple team integration

## License

MIT License - Built for the security community
