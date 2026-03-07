# Architecture Diagram

```mermaid
flowchart TB

    U[User] --> F[Frontend - Azure App Service]

    F --> B[Backend API - Azure App Service]

    B --> K[Azure Key Vault]

    B --> D[(Azure SQL Database)]

    subgraph Azure Resource Group
        F
        B
        K
        D
    end
```
