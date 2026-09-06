const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://arunajyothi:Aruna1234567@cluster0-shard-00-00.urgk8.mongodb.net:27017,cluster0-shard-00-01.urgk8.mongodb.net:27017,cluster0-shard-00-02.urgk8.mongodb.net:27017/sreevedaa_admin?ssl=true&replicaSet=atlas-13wrt9-shard-0&authSource=admin&appName=Cluster0";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "admin" },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

const JobApplicationSchema = new mongoose.Schema({
  jobId: mongoose.Schema.Types.Mixed,
  position: String,
  firstName: String,
  lastName: String,
  fullName: String,
  email: String,
  phone: String,
  currentCompany: String,
  linkedin: String,
  portfolio: String,
  experienceLevel: String,
  coverLetter: String,
  resumeUrl: String,
  resumeName: String,
  status: String,
  notes: String,
}, { timestamps: true });

const JobApplication = mongoose.models.JobApplication || mongoose.model("JobApplication", JobApplicationSchema);

const ServiceSchema = new mongoose.Schema({
  title: String,
  slug: String,
  shortDescription: String,
  description: String,
  icon: String,
  features: [String],
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const ProjectSchema = new mongoose.Schema({
  title: String,
  slug: String,
  category: String,
  description: String,
  technologies: [String],
  image: String,
  outcome: String,
  projectUrl: String,
  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

const TrainingProgramSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  duration: String,
  eligibility: String,
  mode: String,
  curriculum: String,
  projectDetails: String,
  fee: String,
  status: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const TrainingProgram = mongoose.models.TrainingProgram || mongoose.model("TrainingProgram", TrainingProgramSchema);

async function seed() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully!");

  // 1. Seed Admin User
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("Admin@123*", salt);

  const adminEmails = ["admin@sreevedaa.com", "admin@vishait.com"];
  for (const email of adminEmails) {
    await User.findOneAndUpdate(
      { email },
      {
        email,
        passwordHash,
        name: "Administrator",
        role: "admin",
      },
      { upsert: true, new: true }
    );
    console.log(`Admin user created/updated: ${email} with password: Admin@123*`);
  }

  // 2. Seed Sample Job Applications (Candidates)
  const existingApps = await JobApplication.countDocuments();
  if (existingApps === 0) {
    await JobApplication.create([
      {
        position: "Frontend Developer",
        firstName: "jyo",
        lastName: "Boddu",
        fullName: "jyo Boddu",
        email: "jyo.boddu@example.com",
        phone: "9009000980",
        currentCompany: "Tech Innovators Inc",
        linkedin: "https://linkedin.com/in/jyoboddu",
        portfolio: "https://jyoboddu.dev",
        experienceLevel: "Fresher (0–1y)",
        coverLetter: "I am passionate about building intuitive and accessible front-end interfaces with React, Next.js, and modern CSS frameworks. Looking forward to contributing to cutting-edge web applications at Visha IT Solutions.",
        resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        resumeName: "jyo_boddu_resume.pdf",
        status: "New",
        notes: "Great portfolio, review code samples.",
        createdAt: new Date("2026-09-06T10:00:00Z"),
      },
      {
        position: "Cloud Engineer",
        firstName: "Ravi",
        lastName: "Kumar",
        fullName: "Ravi Kumar",
        email: "ravi.kumar@example.com",
        phone: "9876543210",
        currentCompany: "SkyNet Systems",
        linkedin: "https://linkedin.com/in/ravikumar-cloud",
        portfolio: "https://ravikumar.cloud",
        experienceLevel: "Senior (5–8y)",
        coverLetter: "Experienced AWS & Azure Cloud Architect specializing in Kubernetes cluster orchestration, Terraform automation, and secure CI/CD pipelines.",
        resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        resumeName: "ravi_kumar_cloud_resume.pdf",
        status: "Shortlisted",
        notes: "Technical round 1 scheduled for next Tuesday.",
        createdAt: new Date("2026-09-05T14:30:00Z"),
      },
      {
        position: "Full Stack Engineer",
        firstName: "Ananya",
        lastName: "Sharma",
        fullName: "Ananya Sharma",
        email: "ananya.sharma@example.com",
        phone: "9123456780",
        currentCompany: "Nexus Solutions",
        linkedin: "https://linkedin.com/in/ananya-sharma",
        portfolio: "https://ananya.codes",
        experienceLevel: "Mid-Level (2–4y)",
        coverLetter: "Full stack developer with extensive Node.js, Express, MongoDB, and Next.js experience. Led migration of microservices architecture.",
        resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        resumeName: "ananya_sharma_resume.pdf",
        status: "Under Review",
        notes: "Passed resume screening, waiting for hiring manager review.",
        createdAt: new Date("2026-09-04T09:15:00Z"),
      },
    ]);
    console.log("Seeded sample candidates!");
  }

  // 3. Seed Sample Services if empty
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.create([
      {
        title: "Web Application Development",
        slug: "web-development",
        shortDescription: "Custom, scalable Next.js and React enterprise web applications.",
        description: "End-to-end modern web application architecture engineered for speed, high scalability, robust security, and seamless UI/UX.",
        icon: "Code",
        features: ["Next.js & React 19", "Microservices Architecture", "API Integration", "High Performance"],
        isActive: true,
        order: 1,
      },
      {
        title: "Cloud & DevOps Architecture",
        slug: "cloud-devops",
        shortDescription: "Cloud migrations, CI/CD pipeline automation, and Kubernetes orchestration.",
        description: "Cloud-native infrastructure management on AWS, Google Cloud, and Azure with Terraform Infrastructure-as-Code and zero-downtime deployments.",
        icon: "Cloud",
        features: ["AWS & Azure", "Kubernetes & Docker", "Automated CI/CD", "24/7 Monitoring"],
        isActive: true,
        order: 2,
      },
      {
        title: "UI/UX Design Studio",
        slug: "ui-ux-design",
        shortDescription: "Interactive wireframing, modern design systems, and rapid prototyping.",
        description: "Human-centric design philosophies transforming complex enterprise workflows into delightful, conversion-focused user experiences.",
        icon: "Layout",
        features: ["Figma Design Systems", "User Research", "Interactive Prototypes", "Design Audits"],
        isActive: true,
        order: 3,
      },
    ]);
    console.log("Seeded sample services!");
  }

  // 4. Seed Sample Training if empty
  const trainingCount = await TrainingProgram.countDocuments();
  if (trainingCount === 0) {
    await TrainingProgram.create([
      {
        title: "Full Stack Web Development Bootcamp",
        slug: "full-stack-bootcamp",
        description: "Complete immersion in Next.js, React, Node.js, Express, MongoDB, and TypeScript.",
        duration: "16 Weeks",
        eligibility: "Students & IT Professionals",
        mode: "Hybrid / Online",
        curriculum: "Frontend fundamentals, Fullstack TypeScript, Backend Architecture, Real-world Capstone.",
        projectDetails: "Build and deploy 3 production SaaS applications.",
        fee: "INR 35,000",
        status: "upcoming",
        isActive: true,
      },
      {
        title: "Cloud DevOps & Kubernetes Mastery",
        slug: "cloud-devops-mastery",
        description: "Hands-on mastery of AWS, Docker, Kubernetes, Terraform, and GitHub Actions.",
        duration: "12 Weeks",
        eligibility: "Developers & SysAdmins",
        mode: "Online Live",
        curriculum: "Linux, Cloud Architecture, Containerization, Orchestration, CI/CD pipelines.",
        projectDetails: "Automate scalable Kubernetes infrastructure on AWS.",
        fee: "INR 40,000",
        status: "ongoing",
        isActive: true,
      },
    ]);
    console.log("Seeded sample training programs!");
  }

  // 5. Seed Sample Projects if empty
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.create([
      {
        title: "Sreevedaa Interior Decor Platform",
        slug: "sreevedaa-interior-platform",
        category: "Web Application",
        description: "High-end luxury interior design showcase and client quote advisory portal.",
        technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Framer Motion"],
        outcome: "300% increase in digital design consultations.",
        projectUrl: "https://sreevedaa.vercel.app",
        featured: true,
        isActive: true,
      },
      {
        title: "Fintech Real-Time Settlement Engine",
        slug: "fintech-settlement-engine",
        category: "Enterprise Software",
        description: "Ultra-low-latency transaction matching and ledger settlement pipeline.",
        technologies: ["Node.js", "Redis", "Kafka", "PostgreSQL"],
        outcome: "Processes 5,000 transactions per second with sub-50ms latency.",
        projectUrl: "https://example.com/fintech",
        featured: true,
        isActive: true,
      },
    ]);
    console.log("Seeded sample projects!");
  }

  console.log("Database successfully populated! Exiting...");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
