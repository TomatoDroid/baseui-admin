# GEMINI.md

This file provides an overview of the project, its structure, and how to work with it.

## Project Overview

This is a [brief description of the project].

## Key Technologies

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool and development server.
- **TypeScript:** A typed superset of JavaScript.
- **Tailwind CSS:** A utility-first CSS framework.
- **TanStack Router:** A fully type-safe router for React.
- **ESLint:** A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **Prettier:** An opinionated code formatter.
- **Husky:** A tool that makes it easy to use Git hooks.
- **pnpm:** A fast, disk space-efficient package manager.

## Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the project for production.
- `pnpm lint`: Lints the project files.
- `pnpm lint:fix`: Lints the project files and automatically fixes issues.
- `pnpm preview`: Previews the production build.
- `pnpm prepare`: Installs Husky Git hooks.

## File Structure

- `src`: Contains the main source code for the application.
  - `components`: Contains reusable UI components.
  - `routes`: Contains the route definitions for the application.
  - `lib`: Contains utility functions.
  - `assets`: Contains static assets like images and fonts.
- `public`: Contains static assets that are not processed by the build tool.
- `dist`: Contains the production build of the project.

## Getting Started

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Run the development server:**
    ```bash
    pnpm dev
    ```
