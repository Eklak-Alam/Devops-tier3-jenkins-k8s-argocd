# 🚀 Gaprio - Three-Tier Scalable Web Application

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)
![CI/CD](https://img.shields.io/badge/GitHub%20Actions-Automated-orange?style=for-the-badge&logo=github-actions)

> **Gaprio** is a production-ready, full-stack Monorepo application designed to demonstrate a robust **Three-Tier Architecture**. It features a modern "Glassmorphism" UI, a secure Node.js backend with connection pooling, and a self-healing MySQL database layer.

---

## 🏗 Architecture & Design

The application follows a strict separation of concerns, ensuring scalability and maintainability.

```mermaid
graph TD
    Client[Next.js Frontend] -->|REST API (JSON)| LB[Load Balancer / Nginx]
    LB --> Server[Node.js Express Backend]
    Server -->|SQL Queries| DB[(MySQL Database)]
    Server -->|Logs| CloudWatch[Monitoring]