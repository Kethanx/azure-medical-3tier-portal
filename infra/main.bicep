param location string = resourceGroup().location

@description('App Service name')
param appServiceName string = 'api-medical-portal-keegan-bicep'

@description('App Service plan name')
param appServicePlanName string = 'asp-medical-portal-keegan-bicep'

@description('Application Insights name')
param appInsightsName string = 'appi-medical-portal-keegan-bicep'

@description('Key Vault name')
param keyVaultName string = 'kvmedportalbicep'

@description('SQL Server name')
param sqlServerName string = 'medical-portal-sql-keegan-bicep'

@description('SQL Database name')
param sqlDatabaseName string = 'medical-portal-db-keegan-bicep'

@description('SQL admin username')
param sqlAdminLogin string

@secure()
@description('SQL admin password')
param sqlAdminPassword string

resource appInsights 'microsoft.insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
  }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

resource appService 'Microsoft.Web/sites@2022-09-01' = {
  name: appServiceName
  location: location
  kind: 'app,linux'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'PYTHON|3.12'
      appSettings: [
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
      ]
    }
    httpsOnly: true
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: keyVaultName
  location: location
  properties: {
    tenantId: subscription().tenantId
    sku: {
      family: 'A'
      name: 'standard'
    }
    enableRbacAuthorization: true
    enableSoftDelete: true
    publicNetworkAccess: 'Enabled'
  }
}

resource sqlServer 'Microsoft.Sql/servers@2022-05-01-preview' = {
  name: sqlServerName
  location: location
  properties: {
    administratorLogin: sqlAdminLogin
    administratorLoginPassword: sqlAdminPassword
    version: '12.0'
    publicNetworkAccess: 'Enabled'
  }
}

resource sqlDatabase 'Microsoft.Sql/servers/databases@2022-05-01-preview' = {
  parent: sqlServer
  name: sqlDatabaseName
  location: location
  sku: {
    name: 'Basic'
    tier: 'Basic'
  }
}

output appServiceNameOut string = appService.name
output applicationInsightsConnectionString string = appInsights.properties.ConnectionString
output keyVaultNameOut string = keyVault.name
output sqlServerNameOut string = sqlServer.name
output sqlDatabaseNameOut string = sqlDatabase.name
