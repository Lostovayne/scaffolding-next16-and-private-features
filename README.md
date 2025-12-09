# Architecture: Feature-Sliced Container Pattern (Next.js 16)

This project follows a strict **Feature-Sliced** architecture using the **Container Pattern**. We separate routing (`src/app`) from business logic (`src/features`) to ensure maintainability and strict encapsulation.

## Architectural Diagram

The following Mermaid diagram illustrates the dependency flow: **Routing** imports **Feature Views**, which manage their own **Components** and **Data**.

```mermaid
graph TD
    %% Styling
    classDef routeNode fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef featureNode fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef containerNode fill:#c8e6c9,stroke:#1b5e20,stroke-width:3px;
    classDef sharedNode fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    classDef infraNode fill:#f3e5f5,stroke:#4a148c,stroke-width:2px;

    subgraph Infrastructure
        Proxy["proxy.ts"]
        NextConfig["next.config.ts"]
    end
    class Proxy,NextConfig infraNode

    subgraph Routing_Layer ["src/app (Routing Only)"]
        RoutePage["/dashboard/customers/page.tsx<br/>(Thin Wrapper)"]
        RouteLayout["/dashboard/layout.tsx"]
    end
    class RoutePage,RouteLayout routeNode

    subgraph Feature_Layer ["src/features (Business Logic)"]

        subgraph Customer_Feature ["Feature: Customers"]
            CustomerView["customers-view.tsx<br/>(Main Container / Entry)"]

            subgraph Internals ["Private Implementation"]
                CustQueries["queries/get-customers.ts<br/>('use cache')"]
                CustActions["actions/create.ts<br/>('use server')"]
                CustComponents["components/list.tsx"]
                CustHooks["hooks/use-filter.ts"]
            end
        end
        class Customer_Feature featureNode
        class CustomerView containerNode

    end

    subgraph Shared_Layer ["src/shared (Reusables)"]
        SharedUI["components/ui/button.tsx"]
        SharedDB["lib/db.ts"]
    end
    class Shared_Layer sharedNode

    %% Relationships
    User((User)) --> Proxy
    Proxy --> RoutePage

    %% The Critical "Container Pattern" Handoff
    RoutePage -- "1. Imports & Renders" --> CustomerView

    %% Feature Internals
    CustomerView -- "2. Fetches Data" --> CustQueries
    CustomerView -- "3. Renders UI" --> CustComponents
    CustComponents -- "Interacts" --> CustActions
    CustActions -- "Mutates" --> SharedDB
    CustQueries -- "Reads" --> SharedDB

    %% Shared Usage
    CustComponents -. "Uses" .-> SharedUI

    %% Encapsulation Rule
    style CustomerView stroke-dasharray: 0
    style Internals stroke-dasharray: 5 5
```

## Key Rules

1.  **Routing != Logic**: `src/app` should act like a "Router Configuration". Pages simply import a view from `src/features`.
2.  **Container Pattern**: Each feature has a `*-view.tsx` (or `index.ts`) which is the public API.
3.  **Encapsulation**: Internal folders like `components`, `hooks`, `actions` inside a feature are **private**. Do not import them from other features.
4.  **Next.js 16 Caching**: Data fetching (`queries/`) uses `"use cache"` and lives close to where it's used.

## Directory Structure

```plaintext
src/
├── app/                  # Next.js App Router (Thin Layer)
│   └── (dashboard)/
│       └── customers/
│           └── page.tsx  # Imports CustomersView
├── features/             # Business Logic (The Core)
│   ├── customers/
│   │   ├── actions/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── queries/
│   │   ├── types/
│   │   └── customers-view.tsx  # <--- The Container
│   └── auth/
├── shared/               # Shared Utilities & UI
└── assets/               # Static Assets
```
