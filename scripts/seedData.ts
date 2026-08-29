import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Import models
import Service from "../src/lib/models/Service";
import TrainingProgram from "../src/lib/models/TrainingProgram";
import Project from "../src/lib/models/Project";
import Job from "../src/lib/models/Job";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

const services = [
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
];

const trainingPrograms = [
  {
    title: "Full Stack Development",
    slug: "full-stack-development",
    shortDescription: "Master both frontend and backend technologies to build complete web applications.",
    description: "This comprehensive course covers everything you need to know to become a proficient Full Stack Developer. You will learn modern frontend frameworks like React, backend technologies like Node.js, and database management with MongoDB.",
    syllabus: ["HTML/CSS & JavaScript Basics", "React.js & Next.js", "Node.js & Express", "MongoDB & Mongoose", "Deployment & CI/CD"],
    duration: "6 Months",
    mode: "hybrid",
    level: "beginner",
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
    isActive: true,
  },
  {
    title: "Python for Data Science",
    slug: "python-data-science",
    shortDescription: "Learn Python programming and explore the world of Data Science and Machine Learning.",
    description: "Start your journey into Data Science with Python. Learn how to manipulate data, perform statistical analysis, and build machine learning models using popular libraries like Pandas, NumPy, and Scikit-Learn.",
    syllabus: ["Python Fundamentals", "Data Manipulation with Pandas", "Data Visualization", "Introduction to Machine Learning", "Real-world Projects"],
    duration: "3 Months",
    mode: "offline",
    level: "beginner",
    isActive: true,
  }
];

const projects = [
  {
    title: "Global E-Commerce Platform",
    slug: "global-ecommerce-platform",
    clientName: "RetailTech Inc.",
    shortDescription: "A high-performance e-commerce platform handling 10k+ concurrent users.",
    description: "We partnered with RetailTech Inc. to rebuild their legacy e-commerce platform from the ground up. The new architecture is highly scalable, resulting in a 40% increase in conversion rates and significantly reduced page load times.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe API"],
    imageUrl: "",
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
    isActive: true,
  }
];

const jobs = [
  {
    title: "Senior Full Stack Developer",
    slug: "senior-full-stack-developer",
    department: "Engineering",
    location: "Hyderabad (Hybrid)",
    type: "full-time",
    experienceRequired: "5+ Years",
    description: "We are looking for an experienced Full Stack Developer to lead the development of enterprise web applications. You will be responsible for architectural decisions, mentoring junior developers, and writing clean, scalable code.",
    requirements: [
      "Extensive experience with React and Node.js",
      "Strong understanding of database design (SQL and NoSQL)",
      "Experience with cloud platforms like AWS or Azure",
      "Excellent problem-solving skills"
    ],
    isActive: true,
  },
  {
    title: "Digital Marketing Specialist",
    slug: "digital-marketing-specialist",
    department: "Marketing",
    location: "Remote",
    type: "full-time",
    experienceRequired: "2-4 Years",
    description: "Join our marketing team to drive client campaigns. You will be responsible for planning, executing, and optimizing SEO, SEM, and social media campaigns.",
    requirements: [
      "Proven experience in SEO/SEM",
      "Familiarity with Google Analytics and Ads",
      "Strong copywriting and communication skills",
      "Data-driven mindset"
    ],
    isActive: true,
  }
];

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Service.deleteMany({});
    await TrainingProgram.deleteMany({});
    await Project.deleteMany({});
    await Job.deleteMany({});
    console.log("Cleared existing collections");

    // Insert new data
    await Service.insertMany(services);
    await TrainingProgram.insertMany(trainingPrograms);
    await Project.insertMany(projects);
    await Job.insertMany(jobs);

    console.log("Database seeded successfully with dummy data!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedData();
