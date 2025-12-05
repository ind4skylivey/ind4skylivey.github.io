---
layout: default
title: "AI-Augmented Binary Diffing: LLMs in Reverse Engineering"
description: "Leveraging Large Language Models to interpret binary differences, detect suspicious functions, and accelerate reverse engineering workflows."
permalink: /research/ai-augmented-binary-diffing/
---

# AI-Augmented Binary Diffing
## LLMs as Co-Pilots in Reverse Engineering

---

> **PROJECT STATUS:** `PLANNED` 🟡
> **STACK:** Ghidra/Radare2 · **AI:** Local LLMs (Llama/Mistral)
> **FOCUS:** Reverse Engineering · Binary Analysis · Semantic Diffing
> ![AI](https://img.shields.io/badge/AI-Local_LLM-blue?style=flat-square) ![RE](https://img.shields.io/badge/RE-Ghidra_Radare2-orange?style=flat-square)

### ⚡ TL;DR

Traditional binary diffing tools (like Bindiff) rely on graph isomorphism and mnemonic matching. This research explores the use of **Large Language Models (LLMs)** to add a *semantic layer* to binary analysis. Can an AI understand *why* a function changed, not just *how*?

### 🔬 Core Research Areas

1.  **Feature Extraction:** Pipeline for converting assembly/pseudocode into LLM-digestible prompts.
2.  **Semantic Analysis:** Using AI to explain code changes in plain English.
3.  **Suspicious Function Detection:** Training/Prompting models to flag obfuscation or malicious logic patterns.
4.  **Tool Integration:** Practical examples integrating AI outputs with Ghidra and Radare2.

**Expected Outcome:** A specialized prompting methodology, extraction scripts, and a comparative dataset of human vs. AI analysis.
