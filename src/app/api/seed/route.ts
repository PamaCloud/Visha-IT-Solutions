import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Service from "@/lib/models/Service";
import TrainingProgram from "@/lib/models/TrainingProgram";
import Project from "@/lib/models/Project";
import Job from "@/lib/models/Job";

const MONGODB_URI = process.env.MONGODB_URI;

export async function GET() {
  if (!MONGODB_URI) {
    return NextResponse.json({ error: "Missing MONGODB_URI" }, { status: 500 });
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }
    
    // Clear cached models for hot-reload
    delete (mongoose.models as any).Job;
    delete (mongoose.connection.models as any).Job;

    // Clear existing
    await Service.deleteMany({});
    await TrainingProgram.deleteMany({});
    await Project.deleteMany({});
    await Job.deleteMany({});

    // Seed Services
    await Service.insertMany([
      {
        title: "E-Commerce Solutions",
        slug: "e-commerce-solutions",
        shortDescription: "Custom, scalable E-Commerce platforms to drive your online sales.",
        description: "We build robust, scalable, and secure E-Commerce solutions tailored to your business needs. From custom storefronts to advanced inventory management and payment gateway integrations, we deliver platforms that convert visitors into loyal customers.",
        features: ["Custom Storefronts", "Payment Gateway Integration", "Inventory Management", "Mobile Optimized"],
        isActive: true,
      },
      {
        title: "Digital Marketing",
        slug: "digital-marketing",
        shortDescription: "Data-driven marketing strategies to elevate your brand presence.",
        description: "Our digital marketing experts utilize SEO, SEM, social media, and content marketing to drive targeted traffic to your business. We focus on measurable results and maximizing your ROI in the digital space.",
        features: ["Search Engine Optimization (SEO)", "Social Media Marketing", "Pay-Per-Click (PPC)", "Content Strategy"],
        isActive: true,
      },
      {
        title: "IT Recruitment",
        slug: "it-recruitment",
        shortDescription: "Connecting you with top-tier tech talent for your organization.",
        description: "Finding the right tech talent can be challenging. Our IT recruitment services streamline the hiring process, connecting you with pre-vetted, highly skilled professionals across various tech stacks and domains.",
        features: ["Pre-vetted Candidates", "Technical Screenings", "Contract & Permanent Hires", "Fast Turnaround"],
        isActive: true,
      },
      {
        title: "Website Development",
        slug: "website-development",
        shortDescription: "Modern, responsive, and high-performance web applications.",
        description: "We create stunning, responsive websites that serve as the perfect digital storefront for your brand. Our development team uses the latest web technologies to ensure optimal performance, security, and user experience.",
        features: ["Responsive Design", "Custom Web Apps", "CMS Integration", "Performance Optimization"],
        isActive: true,
      }
    ]);

    // Seed Training
    await TrainingProgram.insertMany([
      {
        title: "Full Stack Development",
        slug: "full-stack-development",
        shortDescription: "Master both frontend and backend technologies to build complete web applications.",
        description: "This comprehensive course covers everything you need to know to become a proficient Full Stack Developer. You will learn modern frontend frameworks like React, backend technologies like Node.js, and database management with MongoDB.",
        syllabus: ["HTML/CSS & JavaScript Basics", "React.js & Next.js", "Node.js & Express", "MongoDB & Mongoose", "Deployment & CI/CD"],
        duration: "6 Months",
        mode: "hybrid",
        level: "beginner",
        eligibility: "Any Graduate",
        curriculum: "Module 1: Basics, Module 2: Advanced, Module 3: Projects",
        projectDetails: "Build a complete MERN stack E-Commerce application.",
        isActive: true,
      },
      {
        title: "Advanced Java Programming",
        slug: "advanced-java-programming",
        shortDescription: "Deep dive into enterprise Java development and Spring Boot.",
        description: "Designed for individuals looking to build enterprise-grade applications. This course covers core Java concepts, object-oriented programming, and advanced frameworks like Spring Boot and Hibernate.",
        syllabus: ["Core Java & OOPs", "Collections & Multithreading", "Spring Boot Framework", "Hibernate & JPA", "RESTful API Development"],
        duration: "4 Months",
        mode: "online",
        level: "intermediate",
        eligibility: "Any IT Professional",
        curriculum: "Module 1: Core Java, Module 2: Spring Boot, Module 3: Microservices",
        projectDetails: "Develop a high-performance RESTful API for a banking system.",
        isActive: true,
      }
    ]);

    // Seed Projects
    await Project.insertMany([
      {
        title: "Global E-Commerce Platform",
        slug: "global-ecommerce-platform",
        clientName: "RetailTech Inc.",
        shortDescription: "A high-performance e-commerce platform handling 10k+ concurrent users.",
        description: "We partnered with RetailTech Inc. to rebuild their legacy e-commerce platform from the ground up. The new architecture is highly scalable, resulting in a 40% increase in conversion rates and significantly reduced page load times.",
        technologies: ["Next.js", "Node.js", "MongoDB", "Stripe API"],
        imageUrl: "",
        category: "E-Commerce",
        outcome: "40% increase in conversion rates.",
        isActive: true,
      },
      {
        title: "Corporate HR Portal",
        slug: "corporate-hr-portal",
        clientName: "Enterprise Solutions LLC",
        shortDescription: "An internal HR management system for tracking employee performance and leave.",
        description: "Developed a comprehensive internal portal for HR management, streamlining onboarding, leave requests, and performance reviews. This system replaced multiple legacy tools, centralizing operations for a workforce of 500+ employees.",
        technologies: ["React", "Express", "PostgreSQL", "AWS"],
        imageUrl: "",
        category: "Internal Tooling",
        outcome: "Replaced multiple legacy tools for 500+ employees.",
        isActive: true,
      }
    ]);

    // Seed Jobs
    await Job.insertMany([
      {
        title: "Senior Full Stack Developer",
        jobTitle: "Senior Full Stack Developer",
        slug: "senior-full-stack-developer",
        department: "Engineering",
        location: "Hyderabad (Hybrid)",
        type: "full-time",
        employmentType: "full-time",
        experienceRequired: "5+ Years",
        experience: "5+ Years",
        description: "We are looking for an experienced Full Stack Developer to lead the development of enterprise web applications. You will be responsible for architectural decisions, mentoring junior developers, and writing clean, scalable code.",
        requirements: "Extensive experience with React and Node.js. Strong understanding of database design (SQL and NoSQL). Experience with cloud platforms like AWS or Azure. Excellent problem-solving skills.",
        isActive: true,
      },
      {
        title: "Digital Marketing Specialist",
        jobTitle: "Digital Marketing Specialist",
        slug: "digital-marketing-specialist",
        department: "Marketing",
        location: "Remote",
        type: "full-time",
        employmentType: "full-time",
        experienceRequired: "2-4 Years",
        experience: "2-4 Years",
        description: "Join our marketing team to drive client campaigns. You will be responsible for planning, executing, and optimizing SEO, SEM, and social media campaigns.",
        requirements: "Proven experience in SEO/SEM. Familiarity with Google Analytics and Ads. Strong copywriting and communication skills. Data-driven mindset.",
        isActive: true,
      }
    ]);

    return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
