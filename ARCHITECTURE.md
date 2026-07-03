# ARCHITECTURE.md

# Project 250

## Platform Architecture

### Powered by Parable Labs

**Public Flagship:** The Knowles Collection

---

Version: 1.0

Status: Foundational

Codename: Project 250

---

# Executive Summary

Project 250 is an AI-assisted investigation platform designed to help researchers discover, document, verify, preserve, and explain historical evidence.

Unlike traditional collection management software, Project 250 is built around investigations rather than artifacts.

Artifacts are the beginning.

Investigations are the product.

The Knowles Collection serves as the flagship implementation and proving ground for the platform.

---

# Architecture Philosophy

Project 250 follows four architectural principles.

1. Evidence First

Every conclusion originates from evidence.

---

2. Modular Design

Every component should be reusable.

---

3. Explainable Intelligence

Every AI recommendation should be transparent.

---

4. Enterprise Ready

Every system should be capable of supporting institutions while remaining simple enough for individual researchers.

---

# Platform Layers

```
                    Parable Labs
                         │
                Project 250 Platform
                         │
      ┌──────────────────┼──────────────────┐
      │                  │                  │
 Investigation      Knowledge Graph     AI Framework
     Engine                                │
      │                                    │
      └───────────────┬────────────────────┘
                      │
             The Knowles Collection
            (Flagship Implementation)
```

---

# Organizational Architecture

Parable Labs

Owns:

Technology

Infrastructure

Platform

Intellectual Property

AI Systems

Deployment

---

Project 250

Provides:

Investigation Engine

Knowledge Graph

Evidence Engine

Case File Engine

AI Framework

API Platform

---

The Knowles Collection

Demonstrates:

Historical investigations

Rare book provenance

Case Files

Research methodology

Public experience

---

# Core Components

Project 250 consists of independent systems.

Every system should function independently while remaining connected.

---

## Investigation Engine

Purpose

Coordinate investigations.

Responsibilities

Case management

Research workflow

Evidence lifecycle

Confidence tracking

Version history

Lead generation

---

## Case File Engine

Purpose

Represent every investigation using a standardized structure.

Every Case File contains:

Question

Artifact

Evidence

People

Places

Timeline

Claims

Confidence

Sources

Revision History

Open Questions

---

## Evidence Engine

Purpose

Store and manage evidence.

Supports

Images

Documents

Letters

Maps

Photographs

OCR

Metadata

Annotations

Chain of custody

---

## Knowledge Graph

Purpose

Represent relationships.

Connects:

People

Places

Organizations

Artifacts

Documents

Events

Collections

Every investigation enriches the graph.

---

## AI Framework

Purpose

Coordinate specialized AI agents.

Supports:

Hermes

Codex

Claude

ChatGPT

Future AI systems

Every agent has a clearly defined responsibility.

---

## Search Engine

Purpose

Discover knowledge.

Supports:

Full-text search

Semantic search

People

Places

Artifacts

Evidence

Case Files

Timeline search

Relationship search

---

## Public Experience

The public website is one client of the platform.

It consumes APIs.

It does not contain business logic.

The website should remain replaceable.

---

# AI Architecture

```
Lead Investigator
        │
        ▼
      Hermes
        │
        ├── Investigation
        ├── Evidence Review
        ├── Research Leads
        └── Confidence Updates

        ▼

Knowledge Graph

        ▼

Case Files

        ▼

Public Website
```

Engineering AI systems remain independent.

Codex builds.

Claude documents.

ChatGPT advises.

Hermes investigates.

---

# Data Architecture

Core Objects

Case Files

Artifacts

Evidence

Claims

Sources

People

Places

Events

Documents

Images

Organizations

Collections

Contributors

Versions

Relationships

Every object has a unique identity.

Everything is connected.

---

# API Philosophy

Every platform capability should eventually become an API.

The public website should consume the same APIs available to future products.

No platform capability should depend exclusively on one interface.

---

# Scalability

The architecture should support:

Individuals

Private collectors

Museums

Universities

Libraries

Archives

Historical societies

Auction houses

Enterprise customers

without redesigning the platform.

---

# Security

Evidence is immutable.

Every modification is versioned.

Every significant action is logged.

Trust is more valuable than convenience.

---

# Technology Stack

Frontend

Next.js

React

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion

Backend

Node.js

PostgreSQL

Prisma

API Layer

REST

GraphQL (future)

AI

Hermes

Codex

Claude

ChatGPT

Future AI agents

Hosting

Vercel

Cloud Infrastructure

Parable Labs

---

# Architectural Rules

Never hardcode collection-specific logic.

Build reusable systems.

Protect historical integrity.

Version everything.

Document everything.

Optimize for maintainability.

Optimize for acquisition.

---

# Definition of Success

Project 250 succeeds when:

Every investigation is reproducible.

Every conclusion is evidence-backed.

Every AI recommendation is explainable.

Every component is reusable.

Every institution can trust the platform.

---

# Long-Term Vision

The Knowles Collection is the first implementation.

Project 250 is the platform.

Parable Labs is the technology company.

Future products should require minimal engineering because they inherit the same Investigation Engine.

---

# Closing Statement

History deserves infrastructure.

Evidence deserves software.

Investigations deserve transparency.

Project 250 exists to build the operating system for historical investigation.

---

Project 250

The AI Investigation Engine

Powered by Parable Labs

Public Flagship

The Knowles Collection

Follow the Evidence.
