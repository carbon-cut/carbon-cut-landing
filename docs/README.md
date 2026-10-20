# Documentation map

For confirmed business terminology across Carbon Cut, start with the [domain glossary](../GLOSSARY.md).

Start with the area you are working on:

| Area                | Entry point                                 | Contents                                                                                                     |
| ------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Design and homepage | [Design docs](design/README.md)             | Product claims, house style, design principles, homepage guidance, workflow, and historical design material. |
| Collectivity        | [Collectivity docs](collectivity/README.md) | Product specs, API integration notes, architecture, planning notes, and source references.                   |
| Backend HTTP API    | [OpenAPI guidance](openapi.md)              | Contract coverage, generated types, and synchronization with the backend-owned source.                       |
| Known issues        | [Known issues](known-issues.md)              | Observed issues that have not yet been investigated.                                                     |
| Resource measurement | [Collectivity measurement protocol](testing/collectivity-resource-measurement.md) | Agreed local workload, telemetry, and limits for deployment sizing. |
| Household (retired) | [Household docs](household/README.md)       | Historical form architecture and planning notes; household is not active product scope.                      |

## How to read status

Folder placement describes a document's purpose, not whether its content is current. Most remaining documents predate the present product and need review. The collectivity backlog is a provisional working list with some entries still to verify. Labels such as "current" inside older documents are not evidence of current scope. Use code to check implementation claims and explicit product decisions to establish intended scope.

Household is retired. Its remaining code and documentation do not make it an active product flow. For Collectivity, start with the [product scope](collectivity/product/00-product-truth.md) and [current routes](collectivity/product/routes.md). The product scope document marks questions that remain open.
