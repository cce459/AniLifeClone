# Overview

This is a Korean anime streaming application built with React and Express. The app provides a Netflix-like interface for browsing and watching anime content, featuring multiple content categories (featured, latest, Korean originals), genre-based navigation, and a video player modal. The application is designed with a dark theme and Korean typography, targeting Korean-speaking anime enthusiasts.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**React Single-Page Application**: Built with React 18 using Vite as the build tool and TypeScript for type safety. The app uses functional components with hooks and follows a component-based architecture.

**Routing**: Uses Wouter for lightweight client-side routing, currently implementing a simple home page with a 404 fallback.

**State Management**: Leverages React Query (@tanstack/react-query) for server state management, caching API responses, and handling loading states. No global client state management library is used, relying on React's built-in state and context.

**UI Components**: Built on shadcn/ui component library with Radix UI primitives for accessibility. Uses Tailwind CSS for styling with a custom dark theme configuration and Korean fonts (Noto Sans KR, Inter, Orbitron).

**Component Structure**:
- Layout components (NavigationHeader, Footer)
- Content sections (HeroSection, FeaturedAnimeCarousel, CategoryGrid, etc.)
- UI components (modular shadcn/ui components)
- Video player modal for anime playback

## Backend Architecture

**Express.js REST API**: Node.js server using Express with TypeScript, providing RESTful endpoints for anime data operations.

**API Design**: Clean REST endpoints following conventional patterns:
- GET /api/animes - All anime list
- GET /api/animes/featured - Featured content
- GET /api/animes/latest - Latest releases
- GET /api/animes/korean - Korean originals
- GET /api/animes/:id - Individual anime details
- GET /api/animes/:id/episodes - Episode listings

**Development Setup**: Uses Vite middleware in development for hot module replacement and serves static files in production.

## Data Storage

**Database**: PostgreSQL with Drizzle ORM for type-safe database interactions. Uses Neon Database as the serverless PostgreSQL provider.

**Schema Design**: Three main entities:
- `animes` - Core anime metadata (title, description, genre, ratings, etc.)
- `episodes` - Individual episode data linked to anime
- `watch_progress` - User viewing progress tracking

**In-Memory Fallback**: Implements a memory storage class for development/testing with seeded Korean anime data.

## External Dependencies

**Database**: 
- Neon Database (serverless PostgreSQL)
- Drizzle ORM for database operations
- Drizzle Kit for schema migrations

**UI Framework**:
- shadcn/ui component library
- Radix UI primitives for accessibility
- Tailwind CSS for styling
- Lucide React for icons

**Development Tools**:
- Vite for build tooling and development server
- TypeScript for type safety
- ESBuild for production builds
- Replit-specific plugins for development environment

**Fonts & Styling**:
- Google Fonts (Noto Sans KR, Inter, Orbitron)
- Custom CSS variables for theming
- PostCSS with Autoprefixer

**Media & Content**:
- Unsplash for placeholder images
- Custom Korean anime content seeding

The application is optimized for the Replit development environment with specific plugins and configurations for seamless cloud-based development.