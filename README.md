# Agadê

> **Conceptual portfolio project — not a company or currently operating commercial business.**

Agadê is a conceptual Brazilian eyewear brand exploring digitally manufactured frames, combining contemporary design, digital fabrication, and circular economy principles.

This repository documents and prototypes the product, brand, and digital experience behind the concept.

All products, renders, specifications, commercial data, inventory, and other business-related information presented in this repository are **fictional and conceptual**, created exclusively to demonstrate the project's vision and technical development.

---

## Project Status

> **Current Phase:** Conceptual Prototype — Drop 01

The project is currently focused on validating its visual language, product experience, and digital architecture through a frontend prototype.

### Current progress

* ✅ Brand Book
* ✅ Architecture Decision Records (ADR)
* ✅ Product Requirements Document (PRD)
* ✅ Conceptual Drop 01 catalog
* ✅ Conceptual renders for 12 frame models
* 🚧 Frontend prototype
* ⏳ Migration to Next.js
* ⏳ Initial database structure
* ⏳ Supabase integration
* ⏳ Customization flows
* ⏳ Checkout flow
* ⏳ Testing
* ⏳ Deployment

> Backend, payment, manufacturing, logistics, and commercial operations are part of the project's future vision and **are not currently available or operational**.

---

## About the Conceptual Data

Because Agadê is a portfolio project, the repository uses fictional data to simulate how a future operation could work.

This may include:

* Products and variants
* Conceptual renders and imagery
* Prices and commercial information
* Estimated technical specifications
* SKUs and inventory
* Product customization data
* Sustainability and circular economy information
* Future commerce and fulfillment flows

These elements should not be interpreted as real products available for purchase, confirmed manufacturing specifications, real inventory, or information belonging to an operating company.

---

## Project Principles

Every technical and product decision should preserve Agadê's core principles:

* **Performance**
* **Simplicity**
* **Sustainability**
* **Brand consistency**

Implementation decisions should not contradict these principles without formal review through the project's architectural documentation.

---

## Documentation

The repository contains the project's main product, brand, and architectural documentation.

### Brand

The Brand Book defines Agadê's visual and conceptual identity, including its positioning, visual language, and design principles.

### Product

The Product Requirements Documents define the intended product experience, features, business logic, and future capabilities.

### Architecture

Architecture Decision Records document significant technical decisions and the reasoning behind them.

The documentation is intentionally kept alongside the implementation so that the evolution of the product and its technical decisions can be tracked together.

---

## Technology Stack

### Current Prototype

* React
* TypeScript
* Vite
* Tailwind CSS
* Motion
* React Router

### Planned Architecture

#### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion

#### Backend — BaaS

* Supabase

  * PostgreSQL
  * Authentication
  * Row Level Security (RLS)
  * Storage
  * Edge Functions

#### Infrastructure

* Vercel
* Supabase Managed

#### Payments

* Mercado Pago

> The planned stack represents the architecture defined in the project's documentation. Components will be implemented progressively as the prototype is validated.

---

## Architecture

The planned architecture follows a **Backend as a Service (BaaS)** approach.

The goal is to minimize operational infrastructure while keeping business rules, data integrity, and security close to the data layer.

The architecture primarily relies on:

* PostgreSQL
* Row Level Security
* Edge Functions
* Database policies
* Managed infrastructure

No dedicated application server is planned for the current architecture.

---

## Repository Structure

```text
.
├── prototype/
│   ├── public/
│   │   └── images/
│   │       └── catalog/
│   │           └── drop-01/
│   └── src/
├── docs/
│   ├── adr/
│   ├── prd/
│   ├── brandbook/
│   └── assets/
├── supabase/
└── README.md
```

---

## Why Agadê?

Agadê is being developed as a portfolio project to explore the practical process of building a digital product from the ground up.

The project brings together:

**Brand → Product → UX → Frontend → Data → Architecture**

Rather than focusing exclusively on the visual interface, the goal is to demonstrate how these layers can be developed as parts of the same system.

The repository therefore serves both as a prototype and as a record of the decisions, constraints, and technical evolution behind it.

---

## Project Goals

The main goal is to explore the construction of a complete digital commerce experience around a fictional physical product.

This includes:

* Translating a brand concept into a digital product
* Designing a coherent e-commerce experience
* Modeling products, variants, and inventory
* Exploring customization flows
* Designing a scalable data architecture
* Applying security principles through database policies and RLS
* Documenting architectural decisions
* Exploring the relationship between digital manufacturing and circular economy
* Building and validating the experience incrementally

The intention is not simply to produce a polished interface, but to demonstrate the process of turning an idea into a **coherent, documented, and technically structured digital system**.

---

## Disclaimer

Agadê is a **fictional conceptual project created for portfolio and educational purposes**.

It is not currently operating as a commercial business, and the products presented in the repository are not available for purchase.

Any resemblance to real companies, products, prices, SKUs, inventory, or commercial operations is coincidental or part of the project's fictional design exercise.
