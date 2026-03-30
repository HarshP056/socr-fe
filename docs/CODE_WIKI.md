# SOCR Frontend - Code Wiki

> **SOCR Frontend** - An Angular 16 single-page application providing the user interface for SmartDocs' intelligent document processing platform. Features OCR queue management, invoice verification studio, business administration, system configuration, and dashboard analytics.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Application Bootstrap](#application-bootstrap)
- [Routing Architecture](#routing-architecture)
- [Module Inventory](#module-inventory)
- [Component Inventory](#component-inventory)
- [Service Inventory - Service Map](#service-inventory---service-map)
- [Shared Module & Reusable Components](#shared-module--reusable-components)
- [State Management](#state-management)
- [Authentication & Guards](#authentication--guards)
- [HTTP Interceptor](#http-interceptor)
- [Pipes](#pipes)
- [Models](#models)
- [Environment Configuration](#environment-configuration)
- [Third-Party Libraries](#third-party-libraries)
- [Data Flow Diagrams](#data-flow-diagrams)

---

## Architecture Overview

The application follows Angular's **modular architecture** with lazy-loaded feature modules:

```
┌───────────────────────────────────────────────────────────────┐
│                         AppModule                             │
│  (Bootstrap, HTTP interceptor, Toast notifications)           │
├───────────────────────────────────────────────────────────────┤
│                      AppRoutingModule                         │
│  (Lazy-loaded: AuthModule, LayoutModule)                      │
├───────────────────────────────────────────────────────────────┤
│                       LayoutModule                            │
│  (Header, Footer, main content area with child routes)        │
├───────┬────────┬──────────┬──────────┬───────────┬────────────┤
│ Dash- │ OCR-Q  │ SOCR     │ SOCR OCR │ Business  │ System     │
│ board │        │ OCR-Q    │ Studio   │ Admin     │ Admin      │
│Module │Module  │ Module   │ Module   │ Module    │ Module     │
└───────┴────────┴──────────┴──────────┴───────────┴────────────┘
```

All authenticated routes are protected by `AuthenticationGuard`. The `LayoutModule` provides the shell (header + footer + router outlet) for all feature modules.

---

## Technology Stack

| Component | Technology | Version |
|---|---|---|
| Framework | Angular | 16 |
| Language | TypeScript | 5.0.2 |
| UI Library | Angular Material | 16 |
| UI Components | PrimeNG | 16 |
| CSS Framework | Bootstrap | 5.2.3 |
| Charts | ApexCharts (ng-apexcharts) | 1.8.0 |
| Canvas | Fabric.js | 5.3.0 |
| PDF Viewer | ng2-pdf-viewer | 9.1.5 |
| Modals | ngx-bootstrap | 11.0.2 |
| Dialog Animations | ng-dialog-animation | 3.0.0 |
| Toast Notifications | PrimeNG MessageService | 16 |
| HTTP Client | Angular HttpClient | 16 |
| Build Tool | Angular CLI | 16 |

---

## Project Structure

```
src/
├── app/
│   ├── app.module.ts                    # Root module
│   ├── app.component.ts                 # Root component
│   ├── app-routing.module.ts            # Root routing (auth + layout)
│   ├── routing/
│   │   └── routing.ts                   # Child routes for LayoutModule
│   ├── guards/
│   │   └── auth.guard.ts               # Authentication guard
│   ├── interceptor/
│   │   └── token.interceptor.ts        # JWT token interceptor
│   ├── models/
│   │   └── login.model.ts              # Login request/response models
│   ├── pipe/
│   │   ├── pipe.module.ts              # Pipe module
│   │   ├── filter-table.pipe.ts        # Table filtering pipe
│   │   ├── url-safe.pipe.ts            # URL sanitization pipe
│   │   └── xml.pipe.ts                 # XML formatting pipe
│   ├── services/                        # Application-wide services (57 services)
│   │   ├── index.ts                     # Barrel export file
│   │   └── *.service.ts                # Individual service files
│   ├── layout/                          # Application shell
│   │   ├── layout.module.ts
│   │   ├── layout.component.ts
│   │   ├── header/                      # Top navigation header
│   │   └── footer/                      # Footer bar
│   ├── modules/                         # Feature modules (lazy-loaded)
│   │   ├── auth/                        # Authentication (login)
│   │   ├── dashboard/                   # Dashboard analytics
│   │   ├── ocr-q/                       # OCR Queue (SmartKey invoices)
│   │   ├── socr-ocr-q/                  # SOCR OCR Queue
│   │   ├── socr-ocr-studio/             # SOCR OCR Studio (verification UI)
│   │   ├── business-admin/              # Business administration
│   │   └── system-admin/                # System administration
│   └── shared/                          # Shared/reusable components
│       ├── shared.module.ts
│       ├── components/                  # Reusable components
│       ├── directive/                   # Custom directives
│       ├── loader/                      # Loading spinner
│       ├── material/                    # Angular Material module
│       └── modals/                      # Reusable modal dialogs
├── environments/
│   ├── environment.ts                   # Development config
│   └── environment.prod.ts             # Production config
├── index.html                           # HTML entry point
└── main.ts                              # Angular bootstrap entry
```

---

## Application Bootstrap

### `AppModule` (`app.module.ts`)

The root Angular module that bootstraps the application.

**Imports:**
- `BrowserModule` - Browser platform support
- `AppRoutingModule` - Root routing configuration
- `HttpClientModule` - HTTP client for API calls
- `BrowserAnimationsModule` - Animation support
- `ToastModule` - PrimeNG toast notifications

**Providers:**
- `MessageService` (PrimeNG) - Toast notification service
- `MessageUserService` - Custom user messaging service
- `TokenInterceptor` - JWT HTTP interceptor (via `HTTP_INTERCEPTORS`)

**Bootstrap Component:** `AppComponent`

### `main.ts`

Standard Angular bootstrap using `platformBrowserDynamic().bootstrapModule(AppModule)`.

---

## Routing Architecture

### Root Routes (`app-routing.module.ts`)

| Path | Module | Guard | Description |
|---|---|---|---|
| `/auth` | `AuthModule` (lazy) | None | Login and authentication |
| `/` (default) | `LayoutModule` (lazy) | `AuthenticationGuard` | All authenticated routes |

### Layout Child Routes (`routing/routing.ts`)

| Path | Module | Description |
|---|---|---|
| `/dashboard` | `DashboardModule` | Analytics dashboard |
| `/ocr-q` | `OcrQModule` | OCR Queue (SmartKey invoice list) |
| `/socr-ocr-q` | `SOCROCRQModule` | SOCR OCR Queue (SOCR request list) |
| `/socr-ocr-studio` | `SocrOcrStudioModule` | SOCR OCR Studio (document verification) |
| `/business-admin` | `BusinessAdminModule` | Business administration |
| `/system-admin` | `SystemAdminModule` | System administration |
| `` (empty) | Redirect to `/auth/login` | Default redirect |

### Business Admin Routes (`business-admin.module.ts`)

| Path | Module | Description |
|---|---|---|
| `/business-admin` | `BusinessAdminComponent` | Admin landing page |
| `/business-admin/roles` | `RolesModule` | Role management |
| `/business-admin/user-management` | `UserManagementModule` | User CRUD |
| `/business-admin/channel` | `ChannelModule` | Channel configuration |
| `/business-admin/vendor-management` | `VendorManagementModule` | Vendor master management |
| `/business-admin/purchase-order` | `PurchaseOrderModule` | Purchase order management |
| `/business-admin/conditional-mapping` | `ConditionalMappingModule` | Conditional field mappings |
| `/business-admin/gst` | `GstModule` | GST number management |
| `/business-admin/posted-invoice-data` | `PostedInvoiceDataModule` | Posted invoice records |
| `/business-admin/invoice-buffer-report` | `InvoiceBufferReportModule` | Invoice buffer reports |

### System Admin Routes (`system-admin.routing.ts`)

| Path | Module | Description |
|---|---|---|
| `/system-admin` | `SystemAdminComponent` | Admin shell (sidebar + content) |
| `/system-admin/configurations` | `ConfigurationsModule` | System configurations |
| `/system-admin/integrations` | `IntegrationsModule` | Integration settings |
| `/system-admin/test` | `TestModule` | Test utilities |
| `/system-admin/system-settings` | `SystemSettingsModule` | System settings |
| `/system-admin/system-logs` | `SystemLogsModule` | System log viewer |
| `/system-admin/intelligence-hub` | `IntelligenceHubModule` | AI/Intelligence configuration |

### System Admin > Configurations Routes (`configuration.routing.ts`)

| Path | Module | Description |
|---|---|---|
| `/configurations` | `ConfigurationsComponent` | Configuration list |
| `/configurations/channel` | `ChannelModule` | Channel config |
| `/configurations/email-templates` | `EmailTemplatesModule` | Email template editor |
| `/configurations/ocr-projects` | `OcrProjectModule` | OCR project setup |
| `/configurations/metadata-mapping` | `MetadataMappingModule` | Metadata field mapping |
| `/configurations/docid-range` | `DocIdRangeModule` | Document ID range config |
| `/configurations/fraud-detection` | `AIPromptModule` | AI fraud detection prompts |
| `/configurations/email-classification` | `EmailClassificationConfigModule` | Email classification rules |
| `/configurations/xinvoice-mapping` | `XInvoiceMappingConfigModule` | X-Invoice mapping config |

### System Admin > System Settings Routes

| Path | Module | Description |
|---|---|---|
| `system-settings/admin-email-config` | `AdminEmailConfigModule` | Admin email configuration |
| `system-settings/doc-id-range` | `DocIdRangeModule` | Document ID range |
| `system-settings/license-config` | `LicenseConfigModule` | License configuration |
| `system-settings/logical-systems` | `LogicalSystemModule` | Logical system management |
| `system-settings/smart-key-system` | `SmartKeySystemModule` | SmartKey system config |
| `system-settings/socr-system-config` | `SocrSystemConfigModule` | SOCR system config |
| `system-settings/system-config` | `SystemConfigModule` | General system config |
| `system-settings/system-properties` | `SystemPropertiesModule` | System properties |

### System Admin > Integrations Routes

| Path | Module | Description |
|---|---|---|
| `integrations/azure-ai-config` | `AzureAiConfigModule` | Azure AI integration config |

### System Admin > Intelligence Hub Routes

| Path | Module | Description |
|---|---|---|
| `intelligence-hub/rfp-ai-prompt-config` | `RfpAiPromptConfigModule` | RFP AI prompt configuration |

---

## Module Inventory

### Feature Modules

| Module | Path | Description |
|---|---|---|
| `AuthModule` | `modules/auth/` | Login page, authentication flow |
| `DashboardModule` | `modules/dashboard/` | Analytics dashboard with charts |
| `OcrQModule` | `modules/ocr-q/` | SmartKey OCR queue - invoice list with filtering, status management |
| `SOCROCRQModule` | `modules/socr-ocr-q/` | SOCR OCR queue - document request list with stage tracking |
| `SocrOcrStudioModule` | `modules/socr-ocr-studio/` | Interactive document verification studio with image overlay |
| `BusinessAdminModule` | `modules/business-admin/` | Business administration shell |
| `SystemAdminModule` | `modules/system-admin/` | System administration shell with sidebar navigation |

### Business Admin Sub-Modules

| Module | Path | Description |
|---|---|---|
| `RolesModule` | `business-admin/roles/` | User role management |
| `UserManagementModule` | `business-admin/user-management/` | User CRUD operations |
| `ChannelModule` | `business-admin/channel/` | Document channel configuration |
| `VendorManagementModule` | `business-admin/vendor-management/` | Vendor master data management |
| `PurchaseOrderModule` | `business-admin/purchase-order/` | Purchase order management |
| `ConditionalMappingModule` | `business-admin/conditional-mapping/` | Conditional field mapping rules |
| `GstModule` | `business-admin/gst/` | GST number management |
| `PostedInvoiceDataModule` | `business-admin/posted-invoice-data/` | Posted invoice data viewer |
| `InvoiceBufferReportModule` | `business-admin/invoice-buffer-report/` | Invoice buffer reports |

### System Admin Sub-Modules

| Module | Path | Description |
|---|---|---|
| `ConfigurationsModule` | `system-admin/configurations/` | System configuration management |
| `IntegrationsModule` | `system-admin/integrations/` | External integration settings |
| `SystemSettingsModule` | `system-admin/system-settings/` | System-level settings |
| `SystemLogsModule` | `system-admin/system-logs/` | Log viewer |
| `IntelligenceHubModule` | `system-admin/intelligence-hub/` | AI configuration hub |
| `TestModule` | `system-admin/test/` | Test/debug utilities |

### Configuration Sub-Modules

| Module | Path | Description |
|---|---|---|
| `ChannelModule` | `configurations/modules/channel/` | Channel configuration |
| `EmailTemplatesModule` | `configurations/modules/email-templates/` | Email template editor |
| `OcrProjectModule` | `configurations/modules/ocr-project/` | OCR project setup & field mapping |
| `MetadataMappingModule` | `configurations/modules/metadata-mapping/` | Metadata mapping config |
| `DocIdRangeModule` | `system-settings/doc-id-range/` | Document ID range config |
| `AIPromptModule` | `configurations/modules/ai-prompts/` | AI fraud detection prompts |
| `EmailClassificationConfigModule` | `configurations/modules/email-classification-config/` | Email classification rules |
| `XInvoiceMappingConfigModule` | `configurations/modules/xinvoice-mapping-config/` | X-Invoice mapping config |

### System Settings Sub-Modules

| Module | Path | Description |
|---|---|---|
| `AdminEmailConfigModule` | `system-settings/admin-email-config/` | Admin email SMTP settings |
| `LicenseConfigModule` | `system-settings/license-config/` | License key management |
| `LogicalSystemModule` | `system-settings/logical-systems/` | Logical system (ERP target) config |
| `SmartKeySystemModule` | `system-settings/smart-key-system/` | SmartKey system config |
| `SocrSystemConfigModule` | `system-settings/socr-system-config/` | SOCR system config |
| `SystemConfigModule` | `system-settings/system-config/` | General system config |
| `SystemPropertiesModule` | `system-settings/system-properties/` | System properties editor |

### Integration Sub-Modules

| Module | Path | Description |
|---|---|---|
| `AzureAiConfigModule` | `integrations/azure-ai-config/` | Azure AI integration config |

### Intelligence Hub Sub-Modules

| Module | Path | Description |
|---|---|---|
| `RfpAiPromptConfigModule` | `intelligence-hub/rfp-ai-prompt-config/` | RFP AI prompt configuration |

---

## Component Inventory

### Layout Components

| Component | Path | Description |
|---|---|---|
| `LayoutComponent` | `layout/layout.component.ts` | Application shell - header, content area, footer |
| `HeaderComponent` | `layout/header/header.component.ts` | Top navigation bar with user menu, navigation links |
| `FooterComponent` | `layout/footer/footer.component.ts` | Application footer |

### Auth Components

| Component | Path | Description |
|---|---|---|
| `LoginComponent` | `modules/auth/login/` | Login form with username/password, JWT authentication |

### Dashboard Components

| Component | Path | Description |
|---|---|---|
| `DashboardComponent` | `modules/dashboard/` | Analytics dashboard with chart widgets |
| `BarChartComponent` | `modules/dashboard/bar-chart/` | ApexCharts bar chart for invoice metrics |

### OCR Queue Components

| Component | Path | Description |
|---|---|---|
| `OcrQComponent` | `modules/ocr-q/` | SmartKey invoice queue - list with filters, pagination, status management |

### SOCR OCR Queue Components

| Component | Path | Description |
|---|---|---|
| `SocrOcrQComponent` | `modules/socr-ocr-q/` | SOCR document request queue with stage-based filtering |

### SOCR OCR Studio Components

| Component | Path | Description |
|---|---|---|
| `SocrOcrStudioComponent` | `modules/socr-ocr-studio/` | Interactive OCR verification studio - document image with field overlay, editable header/line items |

### Business Admin Components

| Component | Path | Description |
|---|---|---|
| `BusinessAdminComponent` | `modules/business-admin/` | Business admin landing/navigation |
| `RolesComponent` | `business-admin/roles/` | Role list and management |
| `UserManagementComponent` | `business-admin/user-management/` | User list with CRUD dialogs |
| `CreateUserComponent` | `business-admin/user-management/create-user/` | User creation form |
| `ChannelComponent` | `business-admin/channel/` | Channel list and configuration |
| `CreateChannelComponent` | `business-admin/channel/create-channel/` | Channel creation/edit form |
| `VendorManagementComponent` | `business-admin/vendor-management/` | Vendor master list |
| `CreateVendorComponent` | `business-admin/vendor-management/create-vendor/` | Vendor creation/edit form |
| `PurchaseOrderComponent` | `business-admin/purchase-order/` | Purchase order list |
| `ConditionalMappingComponent` | `business-admin/conditional-mapping/` | Conditional mapping rules list |
| `CreateConditionalMappingComponent` | `business-admin/conditional-mapping/create-conditional-mapping/` | Mapping rule creation form |
| `GstComponent` | `business-admin/gst/` | Company GST number management |
| `PostedInvoiceDataComponent` | `business-admin/posted-invoice-data/` | Posted invoice data viewer |
| `InvoiceBufferReportComponent` | `business-admin/invoice-buffer-report/` | Invoice buffer report table |

### System Admin Components

| Component | Path | Description |
|---|---|---|
| `SystemAdminComponent` | `modules/system-admin/` | System admin shell with sidebar navigation |
| `ConfigurationsComponent` | `system-admin/configurations/` | Configuration menu/list |
| `IntegrationsComponent` | `system-admin/integrations/` | Integration settings list |
| `SystemSettingsComponent` | `system-admin/system-settings/` | System settings menu |
| `SystemLogsComponent` | `system-admin/system-logs/` | System log viewer |
| `FileLogsComponent` | `system-admin/system-logs/file-logs/` | File processing log viewer |
| `IntelligenceHubComponent` | `system-admin/intelligence-hub/` | AI intelligence hub |
| `TestComponent` | `system-admin/test/` | Test/debug utility component |

### Configuration Components

| Component | Path | Description |
|---|---|---|
| `ChannelComponent` | `configurations/modules/channel/` | Channel configuration form |
| `EmailTemplatesComponent` | `configurations/modules/email-templates/` | Email template editor |
| `CreateEmailTemplatesComponent` | `configurations/modules/email-templates/create-email-templates/` | Template creation form |
| `OcrProjectComponent` | `configurations/modules/ocr-project/` | OCR project list |
| `CreateOCRProjectComponent` | `configurations/modules/ocr-project/create-ocr-project/` | OCR project creation form with field mapping |
| `MetadataMappingComponent` | `configurations/modules/metadata-mapping/` | Metadata mapping editor |
| `AiPromptsComponent` | `configurations/modules/ai-prompts/` | AI fraud detection prompt configuration |
| `CreateAiPromptComponent` | `configurations/modules/ai-prompts/create-ai-prompt/` | AI prompt creation form |
| `EmailClassificationConfigComponent` | `configurations/modules/email-classification-config/` | Email classification rule editor |
| `XInvoiceMappingConfigComponent` | `configurations/modules/xinvoice-mapping-config/` | X-Invoice mapping configuration |

### System Settings Components

| Component | Path | Description |
|---|---|---|
| `AdminEmailConfigComponent` | `system-settings/admin-email-config/` | Admin email SMTP config form |
| `DocIdRangeComponent` | `system-settings/doc-id-range/` | Document ID range list |
| `CreateDocidRangeComponent` | `system-settings/doc-id-range/components/create-docid-range/` | DocID range creation form |
| `LicenseConfigComponent` | `system-settings/license-config/` | License configuration form |
| `LogicalSystemsComponent` | `system-settings/logical-systems/` | Logical system list |
| `CreateLogicalSystemComponent` | `system-settings/logical-systems/component/create-logical-system/` | Logical system creation form |
| `SmartKeySystemComponent` | `system-settings/smart-key-system/` | SmartKey system settings |
| `SocrSystemConfigComponent` | `system-settings/socr-system-config/` | SOCR system configuration |
| `SystemConfigComponent` | `system-settings/system-config/` | General system config list |
| `SystemConfigDetailsComponent` | `system-settings/system-config/system-config-details/` | Config detail editor |
| `SystemPropertiesComponent` | `system-settings/system-properties/` | System properties editor |

### Integration Components

| Component | Path | Description |
|---|---|---|
| `AzureAiConfigComponent` | `integrations/azure-ai-config/` | Azure AI config list |
| `OpenAzureAiDialogComponent` | `integrations/azure-ai-config/open-azure-ai-dialog/` | Azure AI config dialog |

### Intelligence Hub Components

| Component | Path | Description |
|---|---|---|
| `RfpAiPromptConfigComponent` | `intelligence-hub/rfp-ai-prompt-config/` | RFP AI prompt config list |
| `RfpAiPromptConfigCreateComponent` | `intelligence-hub/rfp-ai-prompt-config/rfp-ai-prompt-config-create/` | RFP prompt creation form |

---

## Service Inventory - Service Map

All services are located in `src/app/services/` and follow a consistent pattern:
- Injectable with `providedIn: 'root'` (singleton)
- Use `HttpClient` for REST API calls
- Consume `environment.apiUrl` as base URL
- Many use `ApiQueryParamsService` for query parameter construction
- Many use PrimeNG `MessageService` for toast notifications

### Core Services

| Service | File | Backend API | Description |
|---|---|---|---|
| `LoginService` | `login.service.ts` | `POST /auth/signin` | JWT authentication (bypasses interceptor using `HttpBackend`) |
| `StorageService` | `storage.service.ts` | N/A (localStorage) | Token/user storage, logout, session management |
| `CommonService` | `common.service.ts` | `/common/**` | Shared operations: document download, auth types, mode types, roles, status changes, vendor training |
| `ApplicationService` | `application.service.ts` | `/application/**` | Application/tenant CRUD |
| `UserService` | `user.service.ts` | `/users/**` | User CRUD, password management |
| `ErrorService` | `error.service.ts` | `/exception-log/**` | Exception log retrieval |
| `ApiQueryParamsService` | `api-query-params.service.ts` | N/A | URL query parameter builder utility |
| `MessageUserService` | `message-user.service.ts` | N/A | Cross-component messaging, login user state |

### OCR & Document Processing Services

| Service | File | Backend API | Description |
|---|---|---|---|
| `OCRService` | `ocr.service.ts` | `/invoiceBuffer/**`, `/readEmail/**` | Invoice buffer CRUD, ERP sync trigger, OCR queue operations |
| `SocrOcrService` | `socr-ocr.service.ts` | `/formRecognizer/**` | SOCR document operations: get form details, images, MDI response, stage progression, verification save, rule checking |
| `OcrConfigService` | `ocr-config.service.ts` | `/ocrConfig/**` | OCR engine configuration |
| `OcrProjectService` | `ocr-project.service.ts` | `/ocrProject/**` | OCR project CRUD |
| `OcrFieldMappingService` | `ocr-field-mapping.service.ts` | `/ocrFieldMapping/**` | OCR field mapping configuration |
| `OcrMapperConfigService` | `ocr-mapper-config.service.ts` | `/ocrMapperConfig/**` | OCR mapper config |
| `OcrRulesService` | `ocr-rules.service.ts` | `/rules/**` | OCR rules CRUD |
| `OcrCronService` | `ocr-cron.service.ts` | `/ocrCron/**` | OCR cron job management |
| `OcrRequestDataExceptionLogService` | `ocr-request-data-exception-log.service.ts` | `/ocrExceptionLog/**` | OCR exception log retrieval |

### Channel & Email Services

| Service | File | Backend API | Description |
|---|---|---|---|
| `ChannelService` | `channel.service.ts` | `/channel/**` | Channel CRUD, test mail read |
| `ReadEmailService` | `read-email.service.ts` | `/readEmail/**` | Email reading, process channel, queue operations |
| `EmailTemplatesService` | `email-templates.service.ts` | `/emailTemplates/**` | Email template CRUD |
| `EmailClassificationService` | `email-classification.service.ts` | `/emailClassification/**` | Email classification rules |
| `EmailClassificationWorkflowService` | `email-classification-workflow.service.ts` | `/emailClassificationWorkflow/**` | Email classification workflows |
| `EmailClassificationWorkflowConditionService` | `email-classification-workflow-condition.service.ts` | `/emailClassificationWfCondition/**` | Workflow conditions |
| `AdminEmailService` | `admin-email.service.ts` | `/adminEmailConfig/**` | Admin email configuration |

### Business Data Services

| Service | File | Backend API | Description |
|---|---|---|---|
| `VendorService` | `vendor.service.ts` | `/dataBrowser/**` | Vendor CRUD, sync, search |
| `GstService` | `gst.service.ts` | `/companyGst/**` | Company GST number CRUD |
| `ConditionalMappingService` | `conditional-mapping.service.ts` | `/conditionalMapping/**` | Conditional field mapping CRUD |
| `PostedInvoiceDataService` | `posted-invoice-data.service.ts` | `/postedInvoice/**` | Posted invoice data retrieval |
| `DashboardService` | `dashboard.service.ts` | `/dashboard/**` | Dashboard analytics data |

### System Configuration Services

| Service | File | Backend API | Description |
|---|---|---|---|
| `SystemSettingsService` | `system-settings.service.ts` | `/systemSettings/**` | System settings CRUD |
| `SystemConfigService` | `system-config.service.ts` | `/systemConfig/**` | System configuration CRUD |
| `PropertiesService` | `properties.service.ts` | `/properties/**` | System properties management |
| `LicenseService` | `license.service.ts` | `/license/**` | License management |
| `LogicalSystemService` | `logical-system.service.ts` | `/logicalSystem/**` | Logical system CRUD |
| `DocIdRangeService` | `doc-id-range.service.ts` | `/docIdRange/**` | Document ID range CRUD |
| `DocIdLogService` | `doc-id-log.service.ts` | `/docIdLog/**` | Document ID log retrieval |
| `MetadataConfigService` | `metadata-config.service.ts` | `/metadataConfig/**` | Metadata configuration CRUD |
| `SmartStoreService` | `smart-store.service.ts` | `/smartStore/**` | SmartStore configuration |
| `SmartKeyStoreService` | `smart-key-store.service.ts` | `/smartKeyStore/**` | SmartKey store operations |
| `RegionService` | `region.service.ts` | `/region/**` | Region CRUD |
| `XInvoiceMappingConfigService` | `xinvoice-mapping-config.service.ts` | `/xinvoiceMapping/**` | X-Invoice mapping config |

### Integration Services

| Service | File | Backend API | Description |
|---|---|---|---|
| `AzureAiService` | `azure-ai.service.ts` | `/azureConfig/**` | Azure AI configuration CRUD |
| `SsoService` | `sso.service.ts` | `/sso/**` | SSO configuration |
| `OauthProfileService` | `oauth-profile.service.ts` | `/oauthProfile/**` | OAuth profile management |
| `ErpSyncService` | `erp-sync.service.ts` | `/erpSync/**` | ERP synchronization operations |
| `ExternalService` | `external.service.ts` | External APIs | External third-party integrations |

### AI Services

| Service | File | Backend API | Description |
|---|---|---|---|
| `AiPromptCriteriaService` | `ai-prompt-criteria.service.ts` | `/aiPromptCriteria/**` | AI prompt criteria CRUD |
| `OpenAiPromptConfigService` | `open-ai-prompt-config.service.ts` | `/openAiPromptConfig/**` | OpenAI prompt config CRUD |
| `RfpAiPromptConfigService` | `rfp-ai-prompt-config.service.ts` | `/rfpAiPromptConfig/**` | RFP AI prompt config CRUD |

### Logging & Monitoring Services

| Service | File | Backend API | Description |
|---|---|---|---|
| `ApplicationLogService` | `application-log.service.ts` | `/applicationLog/**` | Application log retrieval |
| `AlertLogService` | `alert-log.service.ts` | `/alertLog/**` | Alert log retrieval |
| `NotificationLogService` | `notification-log.service.ts` | `/notificationLog/**` | Notification log retrieval |
| `SpringJobService` | `spring-job.service.ts` | `/springJob/**` | Spring job monitoring |
| `QuartzService` | `quartz.service.ts` | `/quartz/**` | Quartz scheduler operations |

### Utility Services

| Service | File | Description |
|---|---|---|
| `MiscService` | `misc.service.ts` | Miscellaneous utility operations |
| `TestService` | `test.service.ts` | Test/debug operations |

### Service Dependency Map

```
┌─────────────────────────────────────────────────────────────┐
│                     Components                               │
└──────────┬──────────────────────────────────────┬────────────┘
           │                                      │
           v                                      v
┌──────────────────┐                  ┌───────────────────────┐
│  Domain Services │                  │   Utility Services    │
│  (OCR, Vendor,   │                  │  (Storage, ApiQuery,  │
│   Channel, etc.) │                  │   MessageUser, Error) │
└────────┬─────────┘                  └───────────┬───────────┘
         │                                        │
         v                                        v
┌──────────────────────────────────────────────────────────────┐
│                      HttpClient                              │
│              (with TokenInterceptor)                         │
├──────────────────────────────────────────────────────────────┤
│                 environment.apiUrl                            │
│          https://gesco-dev.smartdocs.one/socr-be/            │
└──────────────────────────────────────────────────────────────┘
```

---

## Shared Module & Reusable Components

### `SharedModule` (`shared/shared.module.ts`)

Exports commonly used Angular modules and custom directives:
- `CommonModule`
- `FormsModule`
- `ReactiveFormsModule`
- `NumbersOnlyDirective`

### `MaterialModule` (`shared/material/material.module.ts`)

Centralized Angular Material module importing all used Material components.

### Reusable Components

| Component | Path | Description |
|---|---|---|
| `AlertLogsComponent` | `shared/components/alert-logs/` | Alert log display component |
| `ChangePasswordComponent` | `shared/components/change-password/` | Password change dialog |
| `NotificationLogsComponent` | `shared/components/notification-logs/` | Notification log display |
| `PdfDocumentViewerComponent` | `shared/components/pdf-document-viewer/` | PDF document viewer (ng2-pdf-viewer) |
| `PageLoaderComponent` | `shared/loader/page-loader/` | Full-page loading spinner |

### Reusable Modal Dialogs

| Modal | Path | Description |
|---|---|---|
| `BasicModalComponent` | `shared/modals/basic-modal/` | Generic confirmation/info modal |
| `DeleteConfirmationModalComponent` | `shared/modals/delete-confirmation-modal/` | Delete confirmation dialog |
| `SearchPoComponent` | `shared/modals/search-po/` | Purchase order search modal |
| `SearchVendorComponent` | `shared/modals/search-vendor/` | Vendor search modal |

### Custom Directives

| Directive | Path | Description |
|---|---|---|
| `NumbersOnlyDirective` | `shared/directive/number-only.directive.ts` | Restricts input to numeric values only |

---

## State Management

The application uses a **service-based state management** pattern (no NgRx/Akita):

### Authentication State

```
StorageService
├── localStorage['_user'] = { token: string, user: object }
├── getToken() -> JWT token string
├── getUser() -> User object
├── setLocalStorage(val) -> Store auth response
├── logout() -> Clear storage + navigate to /auth/login
└── loadUserToken() -> Observable<token>
```

### User Session State

```
MessageUserService
├── loginUser: any           // Currently logged-in user object
└── (Cross-component messaging)
```

### No Global Store

Component-level state is managed within each component. Services act as the communication layer between components and the backend API. There is no centralized state store (Redux/NgRx pattern).

---

## Authentication & Guards

### `AuthenticationGuard` (`guards/auth.guard.ts`)

Route guard that protects all authenticated routes:

```typescript
canActivate(): boolean {
    const user = this.storage.getUser();
    this.messageUserService.loginUser = user;
    if (user) return true;
    this.storage.logout();  // Redirects to /auth/login
    return false;
}
```

**Dependencies:** `StorageService`, `MessageUserService`

### Authentication Flow

```
User                        Frontend                      Backend
  │                            │                             │
  │  Enter credentials         │                             │
  │───────────────────────────>│                             │
  │                            │  LoginService.post$()       │
  │                            │  POST /auth/signin          │
  │                            │────────────────────────────>│
  │                            │                             │
  │                            │  { token, user, loginType } │
  │                            │<────────────────────────────│
  │                            │                             │
  │                            │  StorageService              │
  │                            │  .setLocalStorage(response) │
  │                            │                             │
  │                            │  Navigate to /dashboard     │
  │  Dashboard loads           │                             │
  │<───────────────────────────│                             │
  │                            │                             │
  │  (Subsequent API calls)    │                             │
  │───────────────────────────>│  TokenInterceptor adds      │
  │                            │  Authorization: Bearer <jwt>│
  │                            │────────────────────────────>│
```

---

## HTTP Interceptor

### `TokenInterceptor` (`interceptor/token.interceptor.ts`)

Automatically attaches JWT token and timezone to all outgoing HTTP requests:

**Request Modification:**
- Adds `Authorization: Bearer <token>` header (if token exists and header not already set)
- Adds `tz: <timezone>` header (e.g., `America/New_York`)

**Error Handling:**
- `401 LOGGED_OUT` -> Logout and redirect to login
- `401 SESSION_EXPIRED` -> Logout and redirect to login
- `401 Access Denied` -> Logout and redirect to login

**Note:** `LoginService` bypasses this interceptor by using `HttpBackend` directly instead of `HttpClient`.

---

## Pipes

| Pipe | File | Description |
|---|---|---|
| `FilterTablePipe` | `pipe/filter-table.pipe.ts` | Filters table rows based on search criteria |
| `UrlSafePipe` | `pipe/url-safe.pipe.ts` | Sanitizes URLs for safe binding (`DomSanitizer`) |
| `XmlPipe` | `pipe/xml.pipe.ts` | Formats/pretty-prints XML content |

---

## Models

### `LoginRequest` / `LoginResponse` (`models/login.model.ts`)

```typescript
// LoginRequest
interface LoginRequest {
    username: string;
    password: string;
}

// LoginResponse
interface LoginResponse {
    token: string;
    user: object;
    loginType: string;
}
```

Most other data models are implicitly typed through `any` in service methods, following the pattern of the backend's `JsonResponse` wrapper:

```typescript
// Common backend response pattern
{
    status: 'success' | 'failed',
    result: any,
    message: string
}
```

---

## Environment Configuration

### Development (`environment.ts`)

```typescript
export const environment = {
    production: false,
    apiUrl: 'https://gesco-dev.smartdocs.one/socr-be/',
};
```

### Production (`environment.prod.ts`)

```typescript
export const environment = {
    production: true,
    apiUrl: '/socr-be/',   // Relative URL for same-origin deployment
};
```

---

## Third-Party Libraries

| Library | Usage |
|---|---|
| **Angular Material** | UI components (buttons, tables, dialogs, menus, icons, tabs, form fields) |
| **PrimeNG** | Toast notifications (`MessageService`), additional UI components |
| **Bootstrap 5** | Grid system, utility classes, responsive layout |
| **ApexCharts** | Dashboard chart visualizations (bar charts, etc.) |
| **Fabric.js** | Canvas-based document image overlay in SOCR OCR Studio |
| **ng2-pdf-viewer** | PDF document rendering in browser |
| **ngx-bootstrap** | Modal dialogs (`BsModalService`) |
| **ng-dialog-animation** | Animated dialog transitions |
| **file-saver** | Client-side file download (save-as) |

---

## Data Flow Diagrams

### Invoice Processing Flow (Frontend Perspective)

```
Dashboard ─────> View metrics & counts
                        │
                        v
OCR Queue ─────> View invoice list ─────> Filter by status
(OcrQModule)            │
                        v
                 Select invoice ─────> View details
                        │
                        v
                 Run ERP Sync ─────> OCRService.runERPSync()
                        │                      │
                        v                      v
                 Status update          Backend ERP sync


SOCR OCR Queue ──> View SOCR request list ──> Filter by stage
(SOCROCRQModule)          │
                          v
                   Select request ──> View OCR results
                          │
                          v
SOCR OCR Studio ──> View document image + extracted fields
(SocrOcrStudioModule)     │
                          ├──> Edit header fields
                          ├──> Edit line items
                          ├──> Re-process rules
                          ├──> Proceed to next stage
                          └──> Save verification
```

### Admin Configuration Flow

```
System Admin ──> Configurations ──> OCR Projects
                                         │
                                         v
                                  Create/Edit OCR Project
                                  ├── Set MDI model type
                                  ├── Set model version
                                  └── Configure field mappings
                                         │
                                         v
                 Configurations ──> Channel Config
                                         │
                                         v
                                  Create/Edit Channel
                                  ├── Set channel type (Email/FTP/File/REST)
                                  ├── Configure connection details
                                  └── Map to OCR project

Business Admin ──> Vendor Management ──> CRUD vendors
               ├── Purchase Orders ──> View/manage POs
               ├── User Management ──> CRUD users + roles
               ├── GST Management ──> Manage company GST numbers
               └── Conditional Mapping ──> Field mapping rules
```

### Authentication Flow

```
/auth/login ──> LoginComponent
                     │
                     v
              LoginService.post$()
              (bypasses TokenInterceptor)
                     │
                     v
              POST /auth/signin
                     │
                     v
              StorageService.setLocalStorage()
              (stores JWT + user in localStorage)
                     │
                     v
              Navigate to /dashboard
                     │
                     v
              AuthenticationGuard.canActivate()
              (checks StorageService.getUser())
                     │
                     v
              LayoutModule loads
              (Header + Footer + child routes)
```
