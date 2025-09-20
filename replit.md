# Overview

Majra Traders Rice Pricing Calculator is a professional web application designed for the sales team to calculate rice pricing with real-time currency conversion. The application provides password-protected access and supports pricing calculations for both Poland and Western Europe markets with CIF and DDP price calculations based on distance-based delivery rates.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: React hooks (useState) for local component state management
- **UI Framework**: Custom component library built on Radix UI primitives with Tailwind CSS for styling
- **Theme System**: Dark/light mode support using next-themes with CSS custom properties
- **Query Management**: TanStack React Query for data fetching and caching (configured but minimal usage in current implementation)

## Component Structure
- **Modular Design**: Separated concerns with dedicated components for Login, Calculator, Results, and Header
- **Form Handling**: Controlled components with validation for price and distance inputs
- **Responsive Layout**: Card-based layout with professional styling using shadcn/ui design patterns
- **Authentication Flow**: Simple credential-based authentication with hardcoded credentials (Sales_team/Raman@2002)

## Styling and Design
- **CSS Framework**: Tailwind CSS with custom design tokens for consistent theming
- **Design System**: Based on shadcn/ui components with custom color palette and spacing
- **Typography**: Inter font family for clean, professional appearance
- **Icons**: Lucide React for consistent iconography throughout the application

## Business Logic
- **Pricing Calculator**: Distance-based delivery rate calculation with minimum 100km threshold
- **Multi-Market Support**: Separate calculations for Poland and Western Europe markets
- **Currency Conversion**: Mock real-time currency rates for USD, EUR, and PLN
- **Price Types**: Supports both CIF (Cost, Insurance, and Freight) and DDP (Delivered Duty Paid) pricing

## Development Structure
- **File Organization**: Flat structure at root level for easy deployment to platforms like Render
- **Component Library**: Reusable UI components in separate files following atomic design principles
- **Type Safety**: TypeScript interfaces for data structures and component props
- **Configuration**: Multiple config files for different deployment scenarios (Vite, Tailwind, etc.)

# External Dependencies

## Core React Ecosystem
- **@tanstack/react-query**: Data fetching and caching library for API interactions
- **react-hook-form** with **@hookform/resolvers**: Form validation and management
- **next-themes**: Theme switching functionality for dark/light mode support

## UI and Styling
- **@radix-ui/react-*** packages**: Unstyled, accessible UI primitives for building components
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Utility for creating variant-based component APIs
- **lucide-react**: Icon library providing consistent iconography

## Build and Development Tools
- **vite**: Modern build tool and development server
- **typescript**: Static type checking and enhanced developer experience
- **postcss** with **autoprefixer**: CSS processing and vendor prefixing

## Server Infrastructure
- **express**: Node.js web framework for API endpoints (minimal usage currently)
- **drizzle-orm**: Type-safe ORM with PostgreSQL support (configured but not actively used)
- **tsx**: TypeScript execution engine for server-side code

## Database and Storage
- **@neondatabase/serverless**: Serverless PostgreSQL database client
- **drizzle-kit**: Database migration and schema management tool
- **connect-pg-simple**: PostgreSQL session store (configured but not implemented)

## Utility Libraries
- **clsx** and **tailwind-merge**: Conditional CSS class name utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation for various use cases
- **zod**: Schema validation library working with Drizzle ORM