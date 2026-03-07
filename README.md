# Azure Secure 3-Tier Medical Portal (Simulation)

## Overview

This project simulates a secure healthcare-style web application deployed on Microsoft Azure.

It demonstrates a production-style 3-tier cloud architecture:

- Frontend hosted on Azure App Service
- Backend API hosted on Azure App Service
- Azure SQL Database for data storage
- Azure Key Vault for secrets management
- Virtual Network design with private connectivity
- Monitoring with Azure Monitor and Application Insights
- Cost awareness through Azure budgeting and tagging

> Note: This project uses synthetic data only. No real patient data is involved.

---

## Planned Architecture

- **Frontend:** Azure App Service
- **Backend API:** Azure App Service
- **Database:** Azure SQL Database
- **Secrets:** Azure Key Vault
- **Networking:** Azure Virtual Network, subnets, private endpoints
- **Monitoring:** Azure Monitor, Application Insights
- **Governance:** Resource groups, tagging, cost budgets

---

## Repository Structure

````md
````bash
docs/       project documentation
src/        application source code
infra/      future infrastructure as code


## Project Roadmap

### Phase 1 – Core Deployment

- Create Azure Resource Group
- Deploy Frontend and Backend with App Service
- Deploy Azure SQL Database
- Connect application tiers

### Phase 2 – Security and Networking

- Implement Azure Virtual Network
- Configure private endpoint for Azure SQL
- Add Azure Key Vault
- Configure managed identity

### Phase 3 – Observability and Governance

- Enable Application Insights
- Configure Azure Monitor
- Implement cost budgets and alerts

## Architecture Diagram

```mermaid
flowchart TB

    User[User / Doctor]

    Frontend[Frontend - Azure App Service]

    Backend[Backend API - Azure App Service]

    Database[(Azure SQL Database)]

    KeyVault[Azure Key Vault]

    Monitor[Azure Monitor / Application Insights]

    User --> Frontend
    Frontend --> Backend
    Backend --> Database
    Backend --> KeyVault
    Frontend --> Monitor
    Backend --> Monitor
````
````
