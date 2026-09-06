export interface VishaCourseModule {
  title: string;
  badge: string;
  description: string;
  points: string[];
}

export interface VishaTrainingItem {
  id: string;
  slug: string;
  title: string;
  badge?: string;
  shortDescription: string;
  description: string;
  duration: string;
  mode: string;
  level: string;
  technologies: string[];
  syllabus: string[];
  modules: VishaCourseModule[];
  careerRoles: string[];
  image: string;
}

export const VISHA_TRAINING_PROGRAMS: VishaTrainingItem[] = [
  {
    id: "python-full-stack",
    slug: "python-full-stack",
    title: "Python Full Stack Development",
    badge: "Most Popular",
    shortDescription:
      "Master end-to-end web engineering with Python 3.12, Django 5, FastAPI, modern React, and PostgreSQL through hands-on enterprise projects.",
    description:
      "Our Python Full Stack Development program is built from the ground up to transform aspiring developers into production-ready engineers. You will start with core Python programming, object-oriented concepts, and advanced asynchronous programming. You'll master scalable backend architectures using Django and high-performance FastAPI microservices, alongside modern relational databases (PostgreSQL) and caching layers (Redis).\n\nOn the frontend, you'll gain expertise in React.js, modern JavaScript/TypeScript, and responsive UI design with Tailwind CSS. Throughout the course, you'll architect real-world capstone projects, implement Docker containers, configure CI/CD pipelines, and prepare for rigorous technical interviews with top-tier hiring partners.",
    duration: "6 Months",
    mode: "Hybrid (Online + Lab)",
    level: "Beginner to Enterprise",
    technologies: ["Python 3.12", "Django 5", "FastAPI", "React.js", "PostgreSQL", "Pandas", "Docker", "Git"],
    syllabus: [
      "Core & Advanced Python (OOP, AsyncIO, Generators)",
      "Web Frameworks: Django & FastAPI Asynchronous APIs",
      "Relational & NoSQL Databases: PostgreSQL & Redis",
      "Modern Frontend: React.js, Hooks & Tailwind CSS",
      "Data Science, Automation & Web Scraping",
      "Docker, Cloud Deployment & Enterprise Capstone",
    ],
    modules: [
      {
        title: "Module 1: Python Core & Programming Foundations",
        badge: "Weeks 1 - 4",
        description:
          "Learn syntax, object-oriented programming (OOP), asynchronous programming (AsyncIO), data structures, generators, and exception handling.",
        points: [
          "Python 3.12 Syntax, Variables, Memory Model & Control Structures",
          "Object-Oriented Programming (OOP): Classes, Inheritance, Polymorphism & Encapsulation",
          "Advanced Python: Decorators, Generators, Iterators & List Comprehensions",
          "Asynchronous Programming with AsyncIO & Multithreading",
          "File I/O, Logging, Modular Architecture & Virtual Environments",
        ],
      },
      {
        title: "Module 2: The Web Development Stack (Django & FastAPI)",
        badge: "Weeks 5 - 8",
        description:
          "Focus on building robust, full-scale web applications with Django and blazing-fast REST APIs with FastAPI.",
        points: [
          "Django Framework: MVT Pattern, Routing, Controllers & Templates",
          "Django ORM: Models, Relationships, Migrations & QuerySets",
          "Django REST Framework (DRF): Serializers, ViewSets & JWT Authentication",
          "FastAPI: Asynchronous Endpoints, Pydantic Data Validation & OpenAPI Docs",
          "RESTful Architecture, Error Handling & WebSockets Integration",
        ],
      },
      {
        title: "Module 3: Relational & NoSQL Database Integration",
        badge: "Weeks 9 - 12",
        description:
          "Master PostgreSQL database design, relational modeling, complex query optimization, and Redis caching.",
        points: [
          "PostgreSQL Schema Design, Indexing, Constraints & Normalization",
          "SQLAlchemy & Django ORM Database Modeling and Migrations",
          "Complex Joins, Aggregations, Stored Procedures & Query Profiling",
          "Redis In-Memory Caching, Pub/Sub & Session Management",
          "Database Connection Pooling, Transactions & ACID Compliance",
        ],
      },
      {
        title: "Module 4: Frontend Integration & React.js",
        badge: "Weeks 13 - 16",
        description:
          "Learn modern frontend integration by pairing Python backends with interactive, component-driven React interfaces.",
        points: [
          "Modern JavaScript (ES6+), HTML5, CSS3 & Tailwind CSS",
          "React.js Architecture: JSX, Components, Props & Virtual DOM",
          "React Hooks: useState, useEffect, useContext & Custom Hooks",
          "Axios HTTP Client, Token Storage & Protected Routes",
          "State Management with Redux Toolkit or Zustand",
        ],
      },
      {
        title: "Module 5: Data Science, Automation & Web Scraping",
        badge: "Weeks 17 - 20",
        description:
          "Automate real-world tasks, scrape web data, and analyze large datasets using Python's scientific and automation libraries.",
        points: [
          "Web Scraping with Requests, BeautifulSoup & Scrapy",
          "OS & System Automation: os, sys, subprocess & Cron Jobs",
          "Data Analysis & Wrangling with Pandas and NumPy",
          "Data Visualization with Matplotlib & Seaborn",
          "Introduction to Predictive Machine Learning with Scikit-Learn",
        ],
      },
      {
        title: "Module 6: DevOps, Cloud Deployment & Enterprise Capstone",
        badge: "Weeks 21 - 24",
        description:
          "Containerize with Docker, configure automated CI/CD deployment pipelines, and launch production apps on AWS or cloud platforms.",
        points: [
          "Docker Containerization & Multi-Service Docker Compose",
          "GitHub Actions / Jenkins Continuous Integration & Deployment",
          "Cloud Deployment to AWS (EC2, S3, RDS) & Render",
          "Production Security: CORS, Rate Limiting, SSL/TLS & Secrets Management",
          "End-to-End Enterprise Capstone Project & Placement Prep",
        ],
      },
    ],
    careerRoles: [
      "Full Stack Python Engineer",
      "Python Backend Developer",
      "FastAPI / Django Specialist",
      "Software Development Engineer (SDE)",
    ],
    image: "/services/training-and-career-development.jpg",
  },
  {
    id: "mern-stack-development",
    slug: "mern-stack-development",
    title: "MERN Stack Development",
    badge: "High Demand",
    shortDescription:
      "Build high-concurrency modern web apps using MongoDB, Express.js, React.js 19, Node.js, Next.js, and TypeScript with real-time features.",
    description:
      "The MERN stack powers modern web startups and Fortune 500 enterprises alike. This comprehensive masterclass covers modern JavaScript (ES6+), TypeScript, server-side development with Node.js and Express, and robust database design using MongoDB Atlas.\n\nYou will master component architecture with React 19, server-side rendering with Next.js App Router, state management with Redux Toolkit, and real-time socket communications. You will build and deploy an enterprise-grade collaborative application from scratch, complete with automated testing and cloud deployment on AWS.",
    duration: "6 Months",
    mode: "Hybrid",
    level: "Beginner to Pro",
    technologies: ["MongoDB", "Express.js", "React 19", "Node.js", "Next.js", "TypeScript", "AWS"],
    syllabus: [
      "Module 1: JavaScript & Web Foundations – HTML, CSS, and modern JavaScript (ES6+)",
      "Module 2: Node.js & Express.js – Setting up servers and building REST APIs",
      "Module 3: MongoDB & Mongoose – Managing NoSQL databases and schemas",
      "Module 4: React.js – Building front-end components, hooks, and state management",
      "Module 5: Full-Stack Integration & Auth – Connecting frontend to backend, JWT/cookies security",
      "Module 6: Deployment & Projects – Launching live apps on Render, Vercel, or AWS",
    ],
    modules: [
      {
        title: "Module 1: JavaScript & Web Foundations",
        badge: "Weeks 1 - 4",
        description:
          "HTML, CSS, and modern JavaScript (ES6+). Build solid responsive foundations with clean semantic code.",
        points: [
          "Semantic HTML5 & Responsive CSS3 (Flexbox, CSS Grid & Media Queries)",
          "Modern JavaScript (ES6+): Scope, Closures, Destructuring & Spread Operators",
          "Asynchronous JavaScript: Event Loop, Callbacks, Promises & Async/Await",
          "DOM Manipulation, Event Handling & Browser Storage (LocalStorage, SessionStorage)",
          "Git Version Control, GitHub Repositories & Collaborative Workflows",
        ],
      },
      {
        title: "Module 2: Node.js & Express.js",
        badge: "Weeks 5 - 8",
        description:
          "Setting up servers and building REST APIs with high-throughput asynchronous architecture.",
        points: [
          "Node.js Runtime: Architecture, Non-blocking I/O & Core Modules",
          "Building Robust REST APIs with Express.js Routing & Controllers",
          "Custom Middleware, Request Body Parsing & Centralized Error Handling",
          "API Security: CORS, Rate Limiting, Helmet & Data Sanitization",
          "Environment Configuration, Logging with Winston & Debugging",
        ],
      },
      {
        title: "Module 3: MongoDB & Mongoose",
        badge: "Weeks 9 - 12",
        description:
          "Managing NoSQL databases and schemas with MongoDB Atlas and Mongoose ODM.",
        points: [
          "NoSQL Fundamentals & MongoDB Atlas Cloud Cluster Configuration",
          "Mongoose Schema Design, Data Types, Validations & Virtual Fields",
          "CRUD Operations, Complex Queries, Sorting, Pagination & Indexing",
          "Advanced MongoDB Aggregation Pipelines & Analytical Querying",
          "Data Relationships: Embedded Sub-documents vs Reference Population",
        ],
      },
      {
        title: "Module 4: React.js",
        badge: "Weeks 13 - 16",
        description:
          "Building front-end components, hooks, and state management for responsive single-page applications.",
        points: [
          "React 19 Core: JSX, Virtual DOM, Components, Props & State",
          "Modern Hooks: useState, useEffect, useRef, useMemo & useCallback",
          "Complex State Management with Context API & Redux Toolkit / Zustand",
          "Client-Side Routing with React Router v6 & Protected Routes",
          "Modern UI Styling with Tailwind CSS & Responsive Components",
        ],
      },
      {
        title: "Module 5: Full-Stack Integration & Auth",
        badge: "Weeks 17 - 20",
        description:
          "Connecting frontend to backend, using JWT/cookies for login security and role-based access control.",
        points: [
          "Connecting React to Express APIs using Axios & Custom Hooks",
          "User Authentication: Password Hashing (Bcrypt) & JWT Tokens",
          "Secure Cookie-Based Auth with HTTP-Only Tokens & Refresh Tokens",
          "Role-Based Access Control (RBAC): Admin, Instructor & User Dashboards",
          "Real-Time Bidirectional Data Sync with WebSockets / Socket.io",
        ],
      },
      {
        title: "Module 6: Deployment & Projects",
        badge: "Weeks 21 - 24",
        description:
          "Launching live apps on cloud platforms like Render, Vercel, or AWS with continuous integration.",
        points: [
          "Frontend Deployment on Vercel / Netlify with Custom Domains",
          "Backend Cloud Deployment on Render, Railway & AWS EC2/S3",
          "Docker Containerization & GitHub Actions CI/CD Workflows",
          "Full-Stack Enterprise MERN Capstone Project Architecture",
          "Portfolio Showcase, Code Reviews, Mock Interviews & Placement Support",
        ],
      },
    ],
    careerRoles: [
      "MERN Stack Developer",
      "Frontend React Engineer",
      "Node.js Backend Developer",
      "Full Stack Web Engineer",
    ],
    image: "/services/website-development.jpg",
  },
  {
    id: "dotnet-full-stack",
    slug: "dotnet-full-stack",
    title: ".NET Full Stack Development",
    badge: "Enterprise Choice",
    shortDescription:
      "Enterprise systems engineering with C#, ASP.NET Core 9 Web API, Entity Framework Core, Angular/React, Microsoft SQL Server, and Microsoft Azure.",
    description:
      "Enterprise corporations rely on the Microsoft .NET ecosystem for mission-critical reliability and performance. This course provides comprehensive training in C# 13, object-oriented design patterns, and ASP.NET Core 9 Web API development.\n\nYou will master Entity Framework Core, database query optimization with SQL Server, microservices architecture, and modern single-page applications using Angular or React. Learn to package, test, and deploy enterprise applications seamlessly to Microsoft Azure using Azure DevOps CI/CD pipelines.",
    duration: "5 Months",
    mode: "Online & Classroom",
    level: "Intermediate to Enterprise",
    technologies: ["C# 13", ".NET Core 9", "ASP.NET Web API", "Entity Framework", "SQL Server", "Azure", "Angular/React"],
    syllabus: [
      "Module 1: C# Programming Language – Syntax, OOP, Async/Await & LINQ",
      "Module 2: .NET Core & ASP.NET Core – Web APIs, MVC, DI & Middleware",
      "Module 3: Data Access & Databases – Entity Framework Core & SQL Server",
      "Module 4: Frontend Integration – Angular or React with .NET Web APIs",
      "Module 5: DevOps, Cloud & Testing – Unit Testing, Docker & Azure Deployment",
    ],
    modules: [
      {
        title: "Module 1: C# Programming Language",
        badge: "Weeks 1 - 4",
        description:
          "Learn syntax, object-oriented programming (OOP), and asynchronous programming (Async/Await). Master Language Integrated Query (LINQ) for data manipulation.",
        points: [
          "C# 13 Syntax, Data Types, Control Structures & Memory Management",
          "Object-Oriented Programming (OOP) & SOLID Software Design Principles",
          "Asynchronous Programming with Async/Await, Tasks & Parallel Processing",
          "Language Integrated Query (LINQ) for In-Memory & Database Data Manipulation",
          "Generics, Delegates, Events, Lambda Expressions & Exception Handling",
        ],
      },
      {
        title: "Module 2: .NET Core & ASP.NET Core",
        badge: "Weeks 5 - 8",
        description:
          "Focus on building Web APIs and MVC web applications. Understand dependency injection, middleware, and application configuration.",
        points: [
          "ASP.NET Core Architecture & Request Execution Lifecycle",
          "Building RESTful Web APIs with Controllers, Action Results & Routing",
          "Dependency Injection (DI) & Inversion of Control (IoC) Patterns",
          "Custom Middleware, Global Exception Filters & Data Annotations Validation",
          "API Security: JWT Bearer Tokens, Claims, Policies & Role-Based Authorization",
        ],
      },
      {
        title: "Module 3: Data Access & Databases",
        badge: "Weeks 9 - 12",
        description:
          "Master Entity Framework Core (EF Core) as your primary Object-Relational Mapper (ORM). Learn SQL Server (or PostgreSQL) for queries, stored procedures, and database design.",
        points: [
          "Entity Framework Core (EF Core): Code-First Workflow & Fluent API Configuration",
          "Database Relationships (One-to-One, One-to-Many, Many-to-Many)",
          "Database Migrations, Seeding & Automated Versioning",
          "Microsoft SQL Server: Complex Queries, Stored Procedures, Triggers & Indexing",
          "Performance Optimization: AsNoTracking, Eager vs Lazy Loading & Caching",
        ],
      },
      {
        title: "Module 4: Frontend Integration",
        badge: "Weeks 13 - 16",
        description:
          "Learn modern frontend integration pairing .NET Web APIs with Angular or React component architecture.",
        points: [
          "Frontend Architecture with Modern Angular or React.js",
          "Consuming ASP.NET Core Web APIs via HTTP Clients & Services",
          "Client-Side Routing, Route Guards, Interceptors & JWT Token Handling",
          "State Management & Two-Way / One-Way Data Binding Patterns",
          "Responsive Enterprise Dashboards with Tailwind CSS or Material UI",
        ],
      },
      {
        title: "Module 5: DevOps, Cloud & Testing",
        badge: "Weeks 17 - 20",
        description:
          "Understand unit testing using xUnit or NUnit. Learn Git, Docker containerization, and how to deploy applications to Microsoft Azure or AWS.",
        points: [
          "Unit Testing & Integration Testing with xUnit / NUnit & Moq Framework",
          "Git Version Control, Pull Requests & Code Review Protocols",
          "Docker Containerization for ASP.NET Core Applications & SQL Server",
          "Cloud Deployment to Microsoft Azure: Azure App Services & Azure SQL",
          "CI/CD Automation Pipelines with Azure DevOps & GitHub Actions",
        ],
      },
    ],
    careerRoles: [
      ".NET Full Stack Engineer",
      "C# Backend Specialist",
      "Enterprise Solutions Developer",
      "Microsoft Cloud Consultant",
    ],
    image: "/services/ecommerce-solutions.jpg",
  },
];

// Fallback lookup for all training programs including legacy slugs
export const ALL_TRAINING_PROGRAMS: VishaTrainingItem[] = [
  ...VISHA_TRAINING_PROGRAMS,
  {
    id: "java-full-stack",
    slug: "java-full-stack",
    title: "Java Full Stack Development",
    badge: "Industry Classic",
    shortDescription:
      "Deep dive into enterprise Java 21, Spring Boot 3, Microservices, Hibernate ORM, Kafka event streaming, and modern React frontend.",
    description:
      "Java remains the cornerstone of enterprise software worldwide. In this intensive program, you will gain master-level proficiency in Java 21, Spring Boot 3, and Spring Security.",
    duration: "6 Months",
    mode: "Hybrid",
    level: "Comprehensive",
    technologies: ["Java 21", "Spring Boot 3", "Microservices", "Hibernate", "MySQL", "Kafka", "React"],
    syllabus: [
      "Java 21 Core, OOPs, Collections & Multi-threading",
      "Spring Boot 3, Spring Data JPA & Hibernate ORM",
      "Cloud-Native Microservices & Service Discovery",
      "Event-Driven Architecture with Apache Kafka",
      "Security Protocols with Spring Security & JWT",
      "End-to-End Enterprise Integration with React UI",
    ],
    modules: [
      {
        title: "Module 1: Java 21 Core & OOP Mastery",
        badge: "Weeks 1 - 4",
        description: "Core syntax, OOP paradigms, collections framework, and multi-threading.",
        points: ["Java 21 Syntax & Features", "OOP Architecture", "Collections & Generics", "Multi-threading & Concurrency"],
      },
      {
        title: "Module 2: Spring Boot 3 & Hibernate",
        badge: "Weeks 5 - 8",
        description: "Spring framework, Dependency Injection, Spring Data JPA, and Hibernate.",
        points: ["Spring Boot Starters", "Spring Data JPA", "Hibernate ORM", "Transaction Management"],
      },
      {
        title: "Module 3: Microservices & Kafka",
        badge: "Weeks 9 - 12",
        description: "Distributed microservices, API Gateway, Eureka, and Kafka messaging.",
        points: ["Microservices Design", "Service Discovery", "Kafka Event Streams", "Docker Deployment"],
      },
      {
        title: "Module 4: React UI & Full-Stack Deployment",
        badge: "Weeks 13 - 16",
        description: "React frontend integration, JWT authentication, and cloud deployment.",
        points: ["React Integration", "JWT Security", "AWS Cloud Deploy", "Capstone Project"],
      },
    ],
    careerRoles: ["Java Full Stack Developer", "Spring Boot Engineer", "Enterprise Java Architect"],
    image: "/services/recruitment-and-staffing.jpg",
  },
];
