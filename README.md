# Playwright Security Validation Framework

[![Playwright Tests](https://github.com/SushankYerva/OWASP-JuiceShop-Playwright-Security/actions/workflows/playwright.yml/badge.svg)](https://github.com/SushankYerva/OWASP-JuiceShop-Playwright-Security/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-TypeScript-2EAD33)
![Docker](https://img.shields.io/badge/Test%20Environment-Docker-2496ED)
![License](https://img.shields.io/badge/License-MIT-blue)

A Playwright and TypeScript automation framework demonstrating
UI, API, authentication, authorization and security-focused
validation against OWASP Juice Shop.

## Key features

- Anonymous and authenticated Playwright projects
- Dynamically generated test users
- Reusable authenticated browser state
- Authentication and logout validation
- Negative login testing
- Role-based access validation
- Centralized startup-overlay handling
- Docker-based test environment
- GitHub Actions CI execution
- HTML reports, screenshots, traces and videos
- Test strategy, traceability and validation documentation

## Technology

- Playwright
- TypeScript
- Node.js
- Docker
- GitHub Actions

## Prerequisites

- Node.js 20+
- Docker Desktop
- Git

## Installation

```bash
npm ci
npx playwright install chromium