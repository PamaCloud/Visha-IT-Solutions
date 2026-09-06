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
      "Our Python Full Stack Development program is built from the ground up to transform aspiring developers into production-ready engineers. You will start with core Python programming, object-oriented concepts, and advanced asynchronous programming. You'll master scalable backend architectures using Django and high-performance FastAPI microservices, alongside modern relational databases (PostgreSQL) and caching layers (Redis).\n\nOn the frontend, you'll gain expertise in React.js, modern JavaScript/TypeScript, and responsive UI design with Tailwind CSS. Throughout the course, you'll architect 3 real-world capstone projects, implement Docker containers, configure CI/CD pipelines, and prepare for rigorous technical interviews with top-tier hiring partners.",
    duration: "6 Months",
    mode: "Hybrid (Online + Lab)",
    level: "Beginner to Enterprise",
    technologies: ["Python 3.12", "Django 5", "FastAPI", "React.js", "PostgreSQL", "Docker", "Git"],
    syllabus: [
      "Core & Advanced Python (OOP, AsyncIO, Generators)",
      "Backend Architecture with Django & FastAPI",
      "Modern React.js, Hooks, and State Management",
      "Database Engineering with PostgreSQL & ORM",
      "RESTful API & JWT Authentication Protocols",
      "Docker Containerization & Production Deployment",
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
      "Modern JavaScript ES6+ & TypeScript Essentials",
      "Frontend Mastery with React 19 & Next.js App Router",
      "Scalable Backend Services with Node.js & Express",
      "NoSQL Database Modeling with MongoDB & Mongoose",
      "State Management with Redux Toolkit & Zustand",
      "Real-time Sockets, Cloud Deployment, and CI/CD",
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
      "C# 13 Fundamentals, OOP & Solid Design Principles",
      "ASP.NET Core Web API & Microservices Architecture",
      "Data Access with Entity Framework Core & LINQ",
      "Microsoft SQL Server Performance & Stored Procedures",
      "Single Page Applications with Angular or React",
      "Azure Cloud Deployment, KeyVault & DevOps Pipelines",
    ],
    careerRoles: [
      ".NET Full Stack Engineer",
      "C# Backend Specialist",
      "Enterprise Solutions Developer",
      "Microsoft Cloud Consultant",
    ],
    image: "/services/ecommerce-solutions.jpg",
  },
  {
    id: "java-full-stack",
    slug: "java-full-stack",
    title: "Java Full Stack Development",
    badge: "Industry Classic",
    shortDescription:
      "Deep dive into enterprise Java 21, Spring Boot 3, Microservices, Hibernate ORM, Kafka event streaming, and modern React frontend.",
    description:
      "Java remains the cornerstone of banking, healthcare, and enterprise software worldwide. In this intensive program, you will gain master-level proficiency in Java 21, Spring Boot 3, Spring Security, and Spring Data JPA.\n\nYou will design and deploy cloud-native microservices communicating via Apache Kafka and REST APIs, secured with OAuth2/JWT. Complement your backend expertise with React frontend integration, Docker containerization, and JUnit automated unit testing.",
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
    careerRoles: [
      "Java Full Stack Developer",
      "Spring Boot Microservices Engineer",
      "Enterprise Java Architect",
      "Backend Software Engineer",
    ],
    image: "/services/recruitment-and-staffing.jpg",
  },
  {
    id: "cloud-devops-engineering",
    slug: "cloud-devops-engineering",
    title: "Cloud & DevOps Engineering",
    badge: "Fastest Growing",
    shortDescription:
      "Master cloud architecture and modern DevOps workflows with AWS, Docker, Kubernetes, Terraform, Linux, and GitHub Actions CI/CD automation.",
    description:
      "Modern software teams require automated, zero-downtime deployment pipelines. This program provides deep practical knowledge of Linux server administration, AWS cloud infrastructure, container orchestration, and Infrastructure as Code.\n\nYou'll master Docker containers, Kubernetes cluster management with Helm, multi-environment provisioning with Terraform, and continuous integration/continuous delivery (CI/CD) pipelines with GitHub Actions and Jenkins. Graduate with real-world infrastructure repos that prove your ability to deploy and scale production clusters.",
    duration: "4 Months",
    mode: "Online / Practical Labs",
    level: "Intermediate to Advanced",
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux", "Jenkins", "GitHub Actions"],
    syllabus: [
      "Linux Server Administration & Bash Shell Scripting",
      "Amazon Web Services (AWS) Core & Networking",
      "Docker Container Architecture & Multi-Stage Builds",
      "Kubernetes Cluster Setup, Pods, Services & Ingress",
      "Infrastructure as Code (IaC) with Terraform",
      "Automated CI/CD Pipelines & Monitoring with Prometheus",
    ],
    careerRoles: [
      "DevOps Engineer",
      "Cloud Solutions Architect",
      "Site Reliability Engineer (SRE)",
      "Infrastructure Automation Specialist",
    ],
    image: "/services/talent-acquisition.jpg",
  },
  {
    id: "data-science-ai-ml",
    slug: "data-science-ai-ml",
    title: "Data Science & AI / Machine Learning",
    badge: "Cutting Edge",
    shortDescription:
      "Learn Python for data analysis, Pandas, Scikit-learn, deep neural networks, natural language processing, and modern Generative AI with LLMs.",
    description:
      "Step into the future with our industry-leading Data Science and Artificial Intelligence curriculum. You will begin by mastering Python for scientific computing, data wrangling with Pandas and NumPy, and exploratory data visualization with Seaborn.\n\nAdvance through statistical modeling, classical machine learning algorithms, deep learning with TensorFlow and PyTorch, and NLP architectures. The program concludes with applied Generative AI, prompt engineering, and building Retrieval-Augmented Generation (RAG) applications deployed with FastAPI.",
    duration: "6 Months",
    mode: "Online",
    level: "Beginner to Advanced",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch", "LangChain", "FastAPI"],
    syllabus: [
      "Python for Scientific Computing & Advanced Pandas",
      "Exploratory Data Analysis & Statistical Modeling",
      "Supervised & Unsupervised Machine Learning Algorithms",
      "Deep Learning, CNNs & Neural Network Architectures",
      "Natural Language Processing (NLP) & Vector Databases",
      "Generative AI, LLM Fine-Tuning & RAG Deployments",
    ],
    careerRoles: [
      "Data Scientist",
      "Machine Learning Engineer",
      "AI Solutions Developer",
      "Data & Analytics Consultant",
    ],
    image: "/services/digital-marketing-services.jpg",
  },
];
