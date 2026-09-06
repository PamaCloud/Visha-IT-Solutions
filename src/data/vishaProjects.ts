export interface VishaProjectItem {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  category: string;
  badge: string;
  shortDescription: string;
  description: string;
  image: string;
  technologies: string[];
  metrics: string[];
  deliverables: string[];
  outcome: string;
}

export const VISHA_PROJECTS: VishaProjectItem[] = [
  {
    id: "global-ecommerce-platform",
    slug: "global-ecommerce-platform",
    title: "Global E-Commerce Platform",
    clientName: "RetailCorp International",
    category: "E-Commerce & Omnichannel",
    badge: "+45% Conversion Surge",
    shortDescription:
      "A high-concurrency digital commerce engine engineered for global operations, handling 10k+ concurrent shoppers with sub-second page performance.",
    description:
      "RetailCorp International required an enterprise digital commerce overhaul to replace fragmented regional store platforms with a unified, cloud-native commerce ecosystem across 12 countries.\n\nOur team architected a headless Next.js frontend integrated with high-throughput Node.js microservices, MongoDB Atlas multi-region clusters, and Redis caching. We implemented multi-currency checkout via Stripe API, real-time inventory synchronization across warehouse hubs, and automated tax calculations. The new platform handles over 10,000 peak concurrent users during holiday flashes with 99.99% uptime and reduced page load latencies to under 800 milliseconds.",
    image: "/services/ecommerce-solutions.jpg",
    technologies: ["Next.js 15", "Node.js", "MongoDB Atlas", "Redis", "Stripe API", "AWS CloudFront", "Tailwind CSS"],
    metrics: ["+45% Conversion Rate", "99.99% Cloud Uptime", "<800ms Page Latency", "10k+ Peak Concurrent Orders"],
    deliverables: [
      "Headless Storefront with Sub-Second Global CDN",
      "Real-Time Multi-Warehouse Inventory Sync",
      "Multi-Currency & Localized Payment Gateways",
      "Elastic Auto-Scaling Infrastructure on AWS",
    ],
    outcome:
      "Increased conversion rates by 45% while reducing server operating overhead by 32% within the first 6 months of launch.",
  },
  {
    id: "fintech-dashboard",
    slug: "fintech-dashboard",
    title: "FinTech Analytics Dashboard",
    clientName: "SecureBank Financial Group",
    category: "Financial Technology & Banking",
    badge: "Zero-Latency Feeds",
    shortDescription:
      "Institutional wealth management and risk modeling portal tracking $2.4B+ in daily institutional transactions with PCI-DSS compliance.",
    description:
      "SecureBank needed a modern financial intelligence portal capable of synthesizing high-frequency transactional data into actionable predictive insights for asset managers and compliance officers.\n\nWe engineered a resilient single-page application built on React, TypeScript, and high-performance Python FastAPI microservices connected to Apache Kafka event pipelines and time-series databases. The portal features role-based access control, automated AML (Anti-Money Laundering) fraud detection triggers, and SEC regulatory export compliance.",
    image: "/services/digital-marketing-services.jpg",
    technologies: ["React", "TypeScript", "Python FastAPI", "PostgreSQL", "Apache Kafka", "Docker", "Tailwind CSS"],
    metrics: ["$2.4B+ Daily Transactions Tracked", "100% SEC/PCI-DSS Compliance", "4x Faster Audit Turnaround", "<50ms Real-Time Data Push"],
    deliverables: [
      "Sub-Millisecond Financial Stream Visualization",
      "Automated Regulatory & Tax Reporting Engine",
      "Multi-Tier Role & Compliance Permission Matrix",
      "Predictive Machine Learning Risk Assessment Model",
    ],
    outcome:
      "Accelerated compliance audit preparation by 75% and enabled instantaneous risk mitigation across global client portfolios.",
  },
  {
    id: "healthcare-booking-system",
    slug: "healthcare-booking-system",
    title: "Healthcare Telemedicine Portal",
    clientName: "MediCare Health Network",
    category: "Healthcare & MedTech",
    badge: "HIPAA Certified",
    shortDescription:
      "HIPAA-compliant telemedicine and patient scheduling ecosystem serving 150k+ active patients across 24 specialty clinical branches.",
    description:
      "MediCare Health Network sought to bridge physical clinic visits with high-definition digital healthcare consultations through an integrated patient engagement platform.\n\nWe designed and implemented a HIPAA-compliant platform with WebRTC end-to-end encrypted video consultations, electronic health record (EHR) integration, automated appointment scheduling with SMS/WhatsApp notifications, and secure digital prescription dispatch. The platform has successfully facilitated over 150,000 digital consultations with an unprecedented 98.7% patient satisfaction rating.",
    image: "/services/talent-acquisition.jpg",
    technologies: ["Next.js", "WebRTC", "Express.js", "MongoDB", "AWS HIPAA Cloud", "Socket.io", "Twilio API"],
    metrics: ["150k+ Consultations Completed", "85% Reduced Clinic Wait Times", "98.7% Patient Satisfaction", "100% HIPAA Data Encryption"],
    deliverables: [
      "End-to-End Encrypted WebRTC Video Consultation",
      "Centralized Electronic Health Records (EHR) Integration",
      "Automated Multilingual SMS/Email Appointment Reminders",
      "Digital Prescription & Lab Report Portal",
    ],
    outcome:
      "Decreased average patient wait times by 85% and expanded patient service reach into regional and remote communities.",
  },
  {
    id: "logistics-erp",
    slug: "logistics-erp",
    title: "Logistics & Supply Chain ERP",
    clientName: "FastTrack Global Logistics",
    category: "Logistics & Supply Chain",
    badge: "Fleet Telematics",
    shortDescription:
      "End-to-end enterprise supply chain suite managing 1,200+ fleet vehicles, automated route dispatching, and multi-hub warehouse inventories.",
    description:
      "FastTrack Logistics operates across challenging multi-modal supply corridors. They required a modern enterprise resource planning (ERP) system to replace disparate legacy software and gain real-time visibility into fleet operations.\n\nOur engineering team developed a unified platform utilizing ASP.NET Core Web API, Angular, and Microsoft Azure IoT Hub. The solution connects GPS telematics from over 1,200 vehicles, computes optimal delivery routes dynamically to conserve fuel, and automates customs manifest generation across interstate borders.",
    image: "/services/recruitment-and-staffing.jpg",
    technologies: [".NET Core 9", "Angular", "Microsoft SQL Server", "Azure IoT Hub", "PowerBI", "Docker"],
    metrics: ["38% Fewer Delivery Delays", "1,200+ Active Fleet Units", "15k+ Daily Waybills Processed", "$1.8M Annual Fuel Savings"],
    deliverables: [
      "Live GPS Fleet Telematics & Route Optimization",
      "Automated Customs Documentation & Manifest Generator",
      "Cross-Docking & Warehouse RFID Inventory Engine",
      "Mobile Companion App for Dispatchers & Drivers",
    ],
    outcome:
      "Delivered $1.8 million in documented annual fuel and operational savings while reducing freight transit delays by 38%.",
  },
  {
    id: "corporate-hr-portal",
    slug: "corporate-hr-portal",
    title: "Enterprise HRMS & Payroll Cloud",
    clientName: "Enterprise Solutions LLC",
    category: "HR & Enterprise Operations",
    badge: "10k+ Employees",
    shortDescription:
      "Consolidated workforce management platform powering biometric attendance, multi-state payroll computation, and compliance automation.",
    description:
      "Enterprise Solutions LLC manages a distributed workforce of over 10,000 employees across multiple tech parks and remote locations. They needed a zero-defect payroll and human capital management suite.\n\nWe engineered a cloud-native HRMS with microservices architecture, featuring automated biometric timecard reconciliation, 1-click statutory payroll processing (tax deductions, PF, ESI, gratuity), employee self-service leaves, and an AI-assisted candidate applicant tracking system (ATS).",
    image: "/services/payroll-and-hr-services.jpg",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "AWS Lambda", "Tailwind CSS", "Docker"],
    metrics: ["100% Automated Payroll Cycles", "70% Faster Onboarding", "Zero Compliance Penalties", "99.9% Self-Service Adoption"],
    deliverables: [
      "1-Click Multi-State Payroll & Tax Calculation Engine",
      "Interactive Mobile-First Employee Self-Service Hub",
      "Biometric Attendance & Leave Management Integration",
      "Statutory PF/ESI/TDS Government Compliance Generator",
    ],
    outcome:
      "Reduced monthly payroll processing time from 4 days to 45 minutes, with zero statutory compliance filing errors.",
  },
  {
    id: "ai-customer-support-bot",
    slug: "ai-customer-support-bot",
    title: "Omni-Channel AI Support Agent",
    clientName: "OmniTech Global Solutions",
    category: "Artificial Intelligence & Automation",
    badge: "GenAI Powered",
    shortDescription:
      "Context-aware Generative AI support bot resolving 78% of tier-1 customer inquiries instantly across web, WhatsApp, and email.",
    description:
      "OmniTech Global handles over 50,000 customer service interactions weekly across e-commerce, software support, and subscription management.\n\nWe designed an intelligent conversational agent leveraging Retrieval-Augmented Generation (RAG), LangChain, and fine-tuned LLMs connected to OmniTech's knowledge base and CRM. The system answers intricate technical queries in under 1.2 seconds, executes order status lookups and refund authorizations safely, and seamlessly routes complex cases to human representatives with full conversational context.",
    image: "/services/website-development.jpg",
    technologies: ["Python", "FastAPI", "LangChain", "OpenAI LLMs", "Pinecone Vector DB", "Next.js", "Redis"],
    metrics: ["78% First-Contact Resolution", "24/7 Availability Across 8 Channels", "<1.2s Average Response Time", "94% Customer CSAT Rating"],
    deliverables: [
      "Retrieval-Augmented Generation (RAG) Knowledge Integrator",
      "Omni-Channel Connectors (Web, WhatsApp, Slack, Zendesk)",
      "Automated Ticket Categorization & Sentiment Routing",
      "Real-Time Executive Analytics & Sentiment Dashboard",
    ],
    outcome:
      "Achieved a 78% autonomous tier-1 issue resolution rate, saving over 400 support agent hours weekly while increasing CSAT to 94%.",
  },
];
