# Visha IT Solutions - Architecture Plan

## 1. Technology Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, pure CSS for custom aesthetics
- **Components**: Radix UI primitives (if necessary), Lucide React (Icons)
- **Forms**: React Hook Form
- **Validation**: Zod (shared for client & server)
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: Custom JWT with HttpOnly cookies
- **Email**: Nodemailer (SMTP abstraction)
- **File Storage**: Local file system (abstracted for Vercel/S3 integration)

## 2. Folder Structure
Following the strict requirements for layered architecture and separation of concerns:

```
src/
  app/                    # Next.js App Router (Pages & API)
    (public)/             # Public facing routes
    (admin)/              # Admin routes (protected)
    api/                  # API routes
  components/             # Reusable UI components
    ui/                   # Base UI (Buttons, Inputs)
    layout/               # Navigation, Footer
    forms/                # Reusable form elements
  features/               # Business domains
    services/
    training/
    careers/
    projects/
    enquiries/
  services/               # External integrations (Email, Storage, DB)
  repositories/           # Database access layer
  handlers/               # Event handlers and route handlers
  validators/             # Zod schemas
  types/                  # Global TypeScript types
  config/                 # Environment variables and app config
  constants/              # App-wide constants
  styles/                 # Global styles and Tailwind config
```

## 3. Database Schema Design (Mongoose)
Core entities:
- **User**: Admin authentication
- **SiteSetting**: Configurable global settings (email, phone, address, social links)
- **Service**: Dynamic core services (E-Commerce, Digital Marketing, etc.)
- **TrainingProgram**: Training programs details and status
- **Project**: Portfolio items
- **Job**: Career openings
- **JobApplication**: Submitted applications with resume tracking
- **Enquiry**: Project and contact form submissions (with type discrimination)

## 4. Application Flow & Architecture Patterns
The strict rule requires separating UI from Business Logic:
**UI Component (React)** -> **Event Handler (handlers/)** -> **Validation (validators/)** -> **Service Layer (services/)** -> **Repository (repositories/)** -> **Database (MongoDB/Mongoose)**

**Example for Job Application:**
1. `<ApplicationForm />` captures user input.
2. `onSubmit={handleJobApplication}` is called.
3. `handleJobApplication` validates data via `JobApplicationSchema` (Zod).
4. `JobService.applyForJob(data)` is invoked.
5. `JobService` calls `StorageService` to save the resume and `EmailService` to notify admin.
6. `JobService` calls `JobRepository.createApplication(data)` to save to DB.

## 5. Security Architecture
- **Input Validation**: Zod on both client and server.
- **Authentication**: Secure admin login with bcrypt hashing.
- **Authorization**: Route protection for `/admin/*` and API routes.
- **File Uploads**: Strict MIME type, size, and extension validation. Resumes saved to a protected directory not served statically by default.
- **Secrets**: Handled via `src/config/env.ts` to ensure build fails if env vars are missing.
- **Rate Limiting**: Implementation in Next.js middleware or API routes to prevent spam on forms.

## 6. Testing & Quality Assurance
- **Static Analysis**: ESLint and TypeScript strict mode.
- **Unit Testing**: Jest/Vitest for testing utility functions, services, and validators.
- **Component Testing**: React Testing Library for isolated components.
- **E2E Testing**: Cypress or Playwright for critical user flows (enquiry submission, admin login, application submission).
