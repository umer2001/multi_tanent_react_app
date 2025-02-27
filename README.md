# Multi-Tenant React Application

A scalable multi-tenant React application with dynamic domain management using Caddy, Nginx, and Docker. This setup allows for automatic SSL/TLS certificate management and secure domain addition through an API.

## Architecture

### Overview
The application uses a three-tier architecture:

1. **Frontend (React)**
   - Single-page application built with React + TypeScript
   - Multi-tenant support through context-based tenant detection
   - Dynamic theming and configuration per tenant

2. **Proxy Layer**
   - **Caddy**: Primary reverse proxy and SSL/TLS manager
     - Automatic HTTPS certificate management
     - Dynamic domain configuration through API
   - **Nginx**: Security middleware
     - API authentication for Caddy management
     - Static file serving for React app

3. **Infrastructure**
   - Docker-based containerization
   - Docker Compose for service orchestration
   - Volume-based persistence for certificates and configurations

### Security Flow


## Features

- 🔐 Automatic HTTPS for all domains
- 🌐 Dynamic domain addition through API
- 🔒 Secured API endpoints
- 🎨 Per-tenant theming and configuration
- 🚀 Hot Module Replacement (HMR)
- 📦 Docker-based deployment

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Domain names pointing to your server

## Quick Start

1. Clone the repository:

```bash
git clone <repository-url>
cd multi-tenant-react-app
```

2. Create `.env` file:

```bash
cp .env.example .env
```
CADDY_API_KEY=your-secure-api-key-here

3. Build and start the services:

```bash
docker-compose up --build
```

4. Add a new tenant:
To add a new domain, make an API request to the Caddy server:

```bash
  curl -X POST http://your-server:8080/api/caddy/config/apps/http/servers/srv0/routes \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secure-api-key-here" \
  -d '{
  "match": [{"host": ["newdomain.com"]}],
  "handle": [{
  "handler": "reverse_proxy",
  "upstreams": [{"dial": "react-app:80"}]
  }]
  }'
```