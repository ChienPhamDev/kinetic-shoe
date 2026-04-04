# AI Support & Project Context

This file provides context and guidelines for AI agents working on the **Kinetic-Shoe** repository, ensuring adherence to **SOLID principles**.

## Project Overview

**Kinetic-Shoe** is a monorepo containing a modern shoe e-commerce platform with a focus on high-performance features like Flash Sales.

### Tech Stack

- **Backend**: NestJS (TypeScript), TypeORM (PostgreSQL).
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React.

## SOLID Principles in Practice

### Single Responsibility Principle (SRP)

- Controllers handle HTTP logic only.
- Services (Application Layer) execute single use cases.
- Domain Entities encapsulate business rules.

### Open/Closed Principle (OCP)

- Use **Interfaces** for external services (e.g., `IPaymentGateway`).
- Extend functionality via **Inheritance** or **Composition** without modifying existing domain logic.

### Liskov Substitution Principle (LSP)

- Ensure subclasses (or interface implementations) can replace their parents without breaking the system.
- Crucial for **Repository** implementations in the Infrastructure layer.

### Interface Segregation Principle (ISP)

- Create small, specific interfaces rather than "god" interfaces.
- Clients should not depend on methods they don't use.

### Dependency Inversion Principle (DIP)

- **Domain** and **Application** layers should depend on **Abstractions**, not implementations.
- NestJS **Dependency Injection** must be used to inject Infrastructure implementations into Application services.

---

## Repository Structure

```text
Kinetic-Shoe/
├── backend/                # NestJS API
│   ├── src/
│   │   ├── modules/       # Domain modules (Flash Sale, Products, etc.)
│   │   ├── database/     # Schema and Seed SQL files
│   │   ├── common/       # Shared filters, interceptors, etc.
│   │   └── main.ts       # Entry point
│   └── package.json
├── frontend/               # React Vite App
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   └── App.tsx       # Main component
│   └── package.json
└── README.md
```

## Core Domain: Shoe E-commerce

The database schema focuses on:

- **Products**: Basic product info.
- **Product Variants**: Combinations of **Color** and **Size**.
- **Inventory Tracking**: Stock management per variant.

## AI Agent Guidelines

### 1. Backend Patterns (NestJS)

- Use **TypeORM** for database interactions.
- Follow the **Module-Controller-Service** pattern.
- Ensure proper dependency injection.
- Use **Class Validator** and **Class Transformer** for DTOs.
- Reference existing SQL files for schema transitions:
    - [shoe_ecommerce_schema.sql](file:///d:/projects/Kinetic-Shoe/backend/src/database/shoe_ecommerce_schema.sql)
    - [shoe_ecommerce_seed.sql](file:///d:/projects/Kinetic-Shoe/backend/src/database/shoe_ecommerce_seed.sql)

### 2. Frontend Patterns (React)

- Use **Functional Components** with **Hooks**.
- Use **Tailwind CSS** for all styling.
- Use **Framer Motion** for smooth transitions and interactions.
- Prioritize **Lucide React** for icons.
- Follow a modular component structure.

### 3. Flash Sale Specifics

When working on the Flash Sale module:

- Prioritize **concurrency handling** and **data integrity**.
- Use atomic operations for inventory decrements.
- Consider using **Redis** for state tracking during active sales (if applicable).

### 4. Code Quality

- All code must be in **TypeScript**.
- Maintain clean, self-documenting code.
- Avoid placeholders; use realistic data from seeds.

## Common Commands

- **Backend Dev**: `npm run start:dev` (inside `backend/`)
- **Frontend Dev**: `npm run dev` (inside `frontend/`)
- **Seed Database**: Run SQL scripts in `backend/src/database/`.

---

_This file is managed by the development team and AI assistants. Update as project conventions evolve._
