export interface ServiceDeliverable {
  title: string;
  description: string;
  points: string[];
}

export interface ServiceBenefit {
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceStep {
  step: string;
  title: string;
  description: string;
}

export interface VishaServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  iconName: "Users" | "UserCheck" | "FileSpreadsheet" | "Megaphone" | "ShoppingCart" | "GraduationCap";
  subServices: string[];
  features: string[];
  ctaText: string;
  ctaLink: string;
  image: string;
  badge?: string;
  heroPrimaryText?: string;
  heroPrimaryLink?: string;
  heroSecondaryText?: string;
  heroSecondaryLink?: string;
  deliverables?: ServiceDeliverable[];
  benefits?: ServiceBenefit[];
  steps?: ServiceStep[];
  ctaHeadline?: string;
  ctaSubtext?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

export const VISHA_SERVICES: VishaServiceItem[] = [
  // ── 1. RECRUITMENT & STAFFING ──────────────────────────────────────────────
  {
    id: "recruitment-and-staffing",
    slug: "recruitment-and-staffing",
    title: "Recruitment & Staffing",
    shortDescription: "Strategic technical and non-technical talent acquisition, flexible contract staffing, and bulk hiring designed for high-growth enterprises.",
    description: "Finding and placing the right talent is essential for scaling modern business operations. At Visha IT Solutions, our specialized recruitment and staffing services streamline candidate discovery and evaluation, connecting top-tier talent with ambitious companies across India and globally.",
    iconName: "Users",
    subServices: [
      "IT Recruitment",
      "Non-IT Recruitment",
      "Permanent Staffing",
      "Contract Staffing",
      "Contract-to-Hire",
      "Bulk Hiring",
      "Remote / Hybrid Hiring",
    ],
    features: [
      "Specialized Tech & Domain Screenings",
      "Pre-vetted Talent Bench with 48h Turnaround",
      "Contract, Permanent & Executive Search",
      "Seamless Onboarding & Documentation",
    ],
    ctaText: "Hire Talent",
    ctaLink: "/contact?service=recruitment-and-staffing",
    image: "/services/recruitment-and-staffing.jpg",
    badge: "Core Service",
    heroPrimaryText: "Request Talent",
    heroPrimaryLink: "/contact?service=recruitment-and-staffing",
    heroSecondaryText: "Explore Hiring Models",
    heroSecondaryLink: "#what-we-deliver",
    deliverables: [
      {
        title: "IT & Technical Staffing",
        description: "Specialized placement of full-stack engineers, cloud architects, DevOps leads, data scientists, and QA specialists for fast-growing startups and enterprises.",
        points: [
          "Rapid 48-hour candidate shortlisting SLA",
          "Technical competency screening by senior engineers",
          "Strict NDA and intellectual property compliance",
          "Complimentary replacement guarantee within 90 days",
        ],
      },
      {
        title: "Executive Search & Leadership Hiring",
        description: "Dedicated retained search for VP of Engineering, CTO, Product Heads, and C-level leaders who drive digital transformation.",
        points: [
          "Confidential talent mapping & discrete outreach",
          "Deep access to passive executive networks",
          "Rigorous cultural and leadership suitability analysis",
          "Comprehensive executive reference verification",
        ],
      },
      {
        title: "Contract & Contingent Workforce",
        description: "Agile contract staffing enabling organizations to scale engineering teams up or down swiftly in line with project delivery timelines.",
        points: [
          "Flexible monthly, hourly, or milestone contracts",
          "Full payroll, statutory compliance, and insurance managed",
          "Immediate deployment of pre-evaluated specialists",
          "Frictionless contract-to-hire transition pathways",
        ],
      },
      {
        title: "Bulk & Campus Recruitment Drives",
        description: "Large-scale hiring drives designed for corporate expansions, Global Capability Centers (GCCs), and annual graduate intakes.",
        points: [
          "Automated multi-tier assessment & coding evaluation",
          "End-to-end interview logistical coordination",
          "Document verification & compliant offer roll-outs",
          "High candidate joining-ratio optimization",
        ],
      },
    ],
    benefits: [
      {
        title: "Rapid Time-to-Hire",
        description: "Our proprietary talent pool allows us to deliver qualified candidate profiles within 48 to 72 hours, cutting vacant role costs.",
        iconName: "Zap",
      },
      {
        title: "Rigorous Technical Vetting",
        description: "Candidates pass multi-round coding assessments and architecture screenings before interview submission.",
        iconName: "UserCheck",
      },
      {
        title: "Zero-Risk 90-Day Guarantee",
        description: "If an onboarded candidate departs within 90 days, we provide a qualified replacement immediately at zero additional fee.",
        iconName: "ShieldCheck",
      },
      {
        title: "Flexible Staffing Models",
        description: "Easily switch between permanent placements, contract staffing, or contract-to-hire based on evolving budgets.",
        iconName: "Layers",
      },
      {
        title: "100% Statutory Compliance",
        description: "Complete legal compliance with labor regulations, background checks, PF, and NDAs across India.",
        iconName: "FileCheck",
      },
      {
        title: "Dedicated Hiring Partner",
        description: "A single dedicated account manager who deeply understands your technical stack coordinates your hiring pipeline.",
        iconName: "Users",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Requirement & Talent Profiling",
        description: "We analyze your exact technical requirements, seniority criteria, company culture, and delivery milestones to define the ideal candidate profile.",
      },
      {
        step: "02",
        title: "Multi-Tier Screening & Technical Vetting",
        description: "Candidates undergo rigorous coding assessments, behavioral interviews, and credential checks conducted by senior technical experts.",
      },
      {
        step: "03",
        title: "Client Interviews & Smooth Onboarding",
        description: "We coordinate interviews, manage salary expectations, facilitate offer letters, and ensure prompt day-one candidate onboarding.",
      },
    ],
    ctaHeadline: "Ready to Scale Your Team with Top Tech Talent?",
    ctaSubtext: "Connect with our talent specialists today to receive pre-screened candidate profiles within 48 hours.",
    ctaButtonText: "Request Candidates Now",
    ctaButtonLink: "/contact?service=recruitment-and-staffing",
  },

  // ── 2. TALENT ACQUISITION ──────────────────────────────────────────────────
  {
    id: "talent-acquisition",
    slug: "talent-acquisition",
    title: "Talent Acquisition",
    shortDescription: "Proactive workforce planning, candidate screening, employer branding, and specialized pipelines that fuel long-term organizational success.",
    description: "Talent acquisition is more than filling open roles; it is a strategic discipline that shapes the future of your company. We partner closely with organizational leadership to build proactive, high-caliber talent pipelines that fuel long-term market competitiveness.",
    iconName: "UserCheck",
    subServices: [
      "Strategic Workforce Planning",
      "Employer Branding & EVP",
      "Passive Candidate Engagement",
      "Recruitment Process Outsourcing (RPO)",
      "Diversity & Inclusion Hiring",
      "Competency Mapping & Assessments",
    ],
    features: [
      "Custom Talent Pipeline Architecture",
      "Executive & Niche Candidate Discovery",
      "End-to-End RPO Solutions",
      "Candidate Experience Optimization",
    ],
    ctaText: "Build Your Talent Pipeline",
    ctaLink: "/contact?service=talent-acquisition",
    image: "/services/talent-acquisition.jpg",
    badge: "Strategic Advisory",
    heroPrimaryText: "Build Talent Pipeline",
    heroPrimaryLink: "/contact?service=talent-acquisition",
    heroSecondaryText: "Explore Advisory Models",
    heroSecondaryLink: "#what-we-deliver",
    deliverables: [
      {
        title: "Workforce Planning & Forecasting",
        description: "Predictive headcount modeling and competency gap analysis designed to align corporate growth strategies with recruitment readiness.",
        points: [
          "Future-ready technical skills matrix mapping",
          "Competitor talent and compensation benchmarking",
          "Capacity planning and department headcount budgeting",
          "Leadership succession planning roadmaps",
        ],
      },
      {
        title: "Employer Branding & EVP Strategy",
        description: "Positioning your organization as an employer of choice to attract the top 5% of passive specialists in competitive markets.",
        points: [
          "Employee Value Proposition (EVP) framework development",
          "Social recruitment campaigns and LinkedIn talent branding",
          "Candidate journey & interview satisfaction optimization",
          "Employer review management (Glassdoor, Indeed, AmbitionBox)",
        ],
      },
      {
        title: "Passive Talent Engagement & Nurturing",
        description: "Building relationships with specialized leaders and architects months before critical openings officially go live.",
        points: [
          "Exclusive outreach to high-performing non-active job seekers",
          "Continuous candidate community engagement pools",
          "Targeted diversity & inclusion (D&I) sourcing funnels",
          "Real-time market compensation intelligence reports",
        ],
      },
      {
        title: "Recruitment Process Outsourcing (RPO)",
        description: "Complete or modular outsourcing of internal recruitment processes with dedicated on-site or remote recruitment teams.",
        points: [
          "Full ownership of talent acquisition lifecycle",
          "Enterprise ATS implementation and funnel analytics",
          "On-demand scalable recruiter capacity",
          "Drastic reduction in agency spend and overall cost-per-hire",
        ],
      },
    ],
    benefits: [
      {
        title: "Access to Elite Passive Talent",
        description: "Connect with high-caliber senior engineers and leaders who do not participate in public job boards.",
        iconName: "Search",
      },
      {
        title: "Lower Long-Term Cost-Per-Hire",
        description: "Strategic talent pipelines eliminate the need for expensive last-minute third-party headhunters.",
        iconName: "TrendingUp",
      },
      {
        title: "Elevated Employer Brand",
        description: "Establish an attractive market presence that naturally draws top applicants to your career openings.",
        iconName: "Award",
      },
      {
        title: "Data-Driven Hiring Intelligence",
        description: "Leverage market analytics on salary trends, talent availability, and competitor hiring patterns.",
        iconName: "Database",
      },
      {
        title: "Inclusive & Diverse Teams",
        description: "Structured sourcing methods focused on creating balanced, high-performing engineering organizations.",
        iconName: "Users",
      },
      {
        title: "Scalable Recruiter Capacity",
        description: "Instantly scale your recruiting bandwidth during growth phases without increasing fixed internal HR headcount.",
        iconName: "Layers",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Talent Landscape & Competency Mapping",
        description: "We evaluate your hiring roadmaps, required core competencies, and competitive industry dynamics to map ideal candidate persona profiles.",
      },
      {
        step: "02",
        title: "Targeted Sourcing & Relationship Nurturing",
        description: "Our acquisition specialists engage passive leaders through tailored outreach, employer branding, and confidential discussions.",
      },
      {
        step: "03",
        title: "Candidate Selection & Pipeline Integration",
        description: "We conduct structured competency evaluations, present vetted shortlists, and secure candidate commitments smoothly.",
      },
    ],
    ctaHeadline: "Build a High-Performing, Future-Ready Workforce",
    ctaSubtext: "Partner with Visha IT Solutions to build proactive talent pipelines that drive sustainable enterprise growth.",
    ctaButtonText: "Consult Our Talent Experts",
    ctaButtonLink: "/contact?service=talent-acquisition",
  },

  // ── 3. PAYROLL & HR SERVICES ───────────────────────────────────────────────
  {
    id: "payroll-and-hr-services",
    slug: "payroll-and-hr-services",
    title: "Payroll & HR Services",
    shortDescription: "End-to-end payroll processing, statutory compliance, employee benefits administration, and HR management solutions for modern businesses.",
    description: "Managing payroll, tax filings, and employment regulations across complex corporate environments demands meticulous accuracy. Visha IT Solutions offers fully managed payroll and HR operations, ensuring total statutory compliance and zero-error salary execution.",
    iconName: "FileSpreadsheet",
    subServices: [
      "End-to-End Payroll Processing",
      "Statutory Compliance (PF, ESI, TDS, PT)",
      "Employee Benefits Administration",
      "HR Policy & Handbook Development",
      "Time, Attendance & Leave Management",
      "Full & Final Settlement Execution",
    ],
    features: [
      "100% Error-Free Monthly Payroll",
      "Zero-Penalty Statutory Adherence",
      "Employee Self-Service (ESS) Portal",
      "Direct Bank Salary Disbursement",
    ],
    ctaText: "Get Payroll Support",
    ctaLink: "/contact?service=payroll-and-hr-services",
    image: "/services/payroll-and-hr-services.jpg",
    badge: "Enterprise HR",
    heroPrimaryText: "Get Payroll Support",
    heroPrimaryLink: "/contact?service=payroll-and-hr-services",
    heroSecondaryText: "Explore HR Solutions",
    heroSecondaryLink: "#what-we-deliver",
    deliverables: [
      {
        title: "Automated Payroll Execution",
        description: "Seamless monthly salary calculations, automated income tax deductions, overtime calculations, and direct bank disbursement.",
        points: [
          "Automated monthly digital payslip generation",
          "Integration with biometric attendance & leave management",
          "Reimbursements, allowances, and variable pay management",
          "Employee Self-Service (ESS) mobile & web portal access",
        ],
      },
      {
        title: "Statutory Tax & Labor Compliance",
        description: "Comprehensive management of all statutory requirements, shielding your business from regulatory penalties and audit non-compliance.",
        points: [
          "Provident Fund (PF) and ESIC monthly filings and challans",
          "Professional Tax (PT) and TDS deductions & quarterly filings",
          "Form 16 generation & year-end employee tax reconciliations",
          "Labor law audit readiness & inspection documentation",
        ],
      },
      {
        title: "Employee Lifecycle Management",
        description: "Full administrative support from digital offer letters and background verification to seamless full-and-final exit settlements.",
        points: [
          "Paperless digital employee onboarding and document verification",
          "Group medical & term life insurance plan administration",
          "Gratuity liability calculations and leave encashments",
          "Fast-track Full & Final (F&F) settlement processing",
        ],
      },
      {
        title: "Compensation & HR Policy Structuring",
        description: "Designing tax-optimized Cost-to-Company (CTC) compensation structures and corporate governance frameworks.",
        points: [
          "Tax-efficient CTC salary restructuring for staff retention",
          "POSH compliance and code of conduct framework creation",
          "Performance appraisal & incentive policy formulation",
          "Enterprise cloud HRMS setup and workflow integration",
        ],
      },
    ],
    benefits: [
      {
        title: "100% Payroll Accuracy",
        description: "Eliminate manual calculation mistakes with automated, audited payroll computation engines.",
        iconName: "CheckCircle2",
      },
      {
        title: "Zero Regulatory Penalties",
        description: "Guaranteed on-time filings for PF, ESIC, PT, and TDS ensure complete peace of mind during audits.",
        iconName: "ShieldCheck",
      },
      {
        title: "Significant Administrative Savings",
        description: "Free your executive and leadership team from tedious operational paperwork to focus on business goals.",
        iconName: "Clock",
      },
      {
        title: "Bank-Grade Data Confidentiality",
        description: "Salary figures, bank details, and personal records are safeguarded with strict access controls.",
        iconName: "Lock",
      },
      {
        title: "Employee Self-Service Portal",
        description: "Staff can view payslips, submit tax proofs, and track leave balances anytime from mobile or desktop.",
        iconName: "Smartphone",
      },
      {
        title: "Real-Time Executive Dashboards",
        description: "Clear analytics into monthly workforce expenditure, statutory liabilities, and department cost trends.",
        iconName: "Database",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Compliance & Salary Audit",
        description: "We review your existing compensation structures, historical filings, and workforce records to identify discrepancies and optimize taxes.",
      },
      {
        step: "02",
        title: "System Setup & Policy Integration",
        description: "We configure statutory deduction rules, connect your attendance tracking systems, and establish automated monthly workflows.",
      },
      {
        step: "03",
        title: "Monthly Execution & Statutory Filing",
        description: "We process accurate monthly payroll, issue secure digital payslips, and submit all statutory returns punctually.",
      },
    ],
    ctaHeadline: "Streamline Your Payroll & HR Operations Today",
    ctaSubtext: "Ensure 100% statutory compliance, zero payroll errors, and effortless salary disbursements for your organization.",
    ctaButtonText: "Schedule a Payroll Consultation",
    ctaButtonLink: "/contact?service=payroll-and-hr-services",
  },

  // ── 4. DIGITAL MARKETING ───────────────────────────────────────────────────
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription: "Data-driven SEO, performance PPC advertising, social media growth, and conversion rate optimization that drives high-intent customer acquisition.",
    description: "In an increasingly competitive digital landscape, visibility alone is not enough; businesses need measurable customer acquisition. Visha IT Solutions delivers targeted digital marketing campaigns powered by data science, behavioral analytics, and compelling creative storytelling.",
    iconName: "Megaphone",
    subServices: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click Advertising (PPC)",
      "Social Media Marketing (SMM)",
      "Performance Marketing & Paid Ads",
      "Content Strategy & Copywriting",
      "Conversion Rate Optimization (CRO)",
    ],
    features: [
      "Top Google Organic Rankings",
      "High ROAS Paid Campaigns",
      "Data-Backed Conversion Funnels",
      "Omnichannel Brand Presence",
    ],
    ctaText: "Grow Your Business",
    ctaLink: "/contact?service=digital-marketing",
    image: "/services/digital-marketing.jpg",
    badge: "Growth Engine",
    heroPrimaryText: "Scale Your Business",
    heroPrimaryLink: "/contact?service=digital-marketing",
    heroSecondaryText: "Explore Growth Services",
    heroSecondaryLink: "#what-we-deliver",
    deliverables: [
      {
        title: "Search Engine Optimization (SEO)",
        description: "Dominating organic search results for commercial, high-intent queries to create a permanent stream of qualified inbound leads.",
        points: [
          "Technical SEO, Core Web Vitals, and crawlability optimization",
          "In-depth competitor and high-converting keyword research",
          "Authoritative backlink acquisition & digital PR placement",
          "Google Business Profile and local search dominance",
        ],
      },
      {
        title: "Performance Ads (Google & Meta Ads)",
        description: "ROI-focused paid advertising across Google Search, Display, YouTube, LinkedIn, and Meta that turns ad spend into qualified sales.",
        points: [
          "Precision demographic, firmographic, and intent targeting",
          "High-converting ad creatives and custom sales landing pages",
          "Advanced retargeting funnels to capture lost visitors",
          "Continuous A/B testing to lower Cost-per-Acquisition (CPA)",
        ],
      },
      {
        title: "Social Media & Brand Authority",
        description: "Cultivating an engaged community and authoritative brand presence across LinkedIn, Instagram, and corporate social channels.",
        points: [
          "Monthly content strategy and multimedia creative production",
          "Executive personal branding & B2B thought leadership",
          "Short-form video content (Reels & Shorts) creation",
          "Proactive audience engagement and community management",
        ],
      },
      {
        title: "Conversion Optimization & Funnels",
        description: "Systematic scientific testing of web pages, calls-to-action, and user journeys to maximize the value of every visitor.",
        points: [
          "Heatmap analysis, scroll tracking, and drop-off analysis",
          "Frictionless mobile landing pages built for instant conversion",
          "Automated lead nurturing emails and CRM integration",
          "Transparent attribution modeling and live revenue reporting",
        ],
      },
    ],
    benefits: [
      {
        title: "Tangible Revenue Growth",
        description: "We focus on genuine business outcomes — verified phone calls, booked appointments, and qualified sales leads.",
        iconName: "TrendingUp",
      },
      {
        title: "Lower Acquisition Costs",
        description: "Rigorous negative-keyword pruning and audience refinement maximize the conversion efficiency of your ad budget.",
        iconName: "Zap",
      },
      {
        title: "Long-Term Organic Visibility",
        description: "Sustainable white-hat SEO ensures top search placement that generates free inbound leads month after month.",
        iconName: "Search",
      },
      {
        title: "Omnichannel Brand Consistency",
        description: "Present an authoritative, unified corporate image across search, social media, and digital touchpoints.",
        iconName: "Award",
      },
      {
        title: "Live Transparent Dashboards",
        description: "Real-time metrics tracking traffic, lead volume, cost-per-lead, and overall return on ad spend (ROAS).",
        iconName: "Database",
      },
      {
        title: "Certified Marketing Specialists",
        description: "Work directly with Google and Meta certified growth strategists dedicated to your business targets.",
        iconName: "Users",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Market Analysis & Funnel Audit",
        description: "We conduct deep competitive research, audit your current digital channels, and identify immediate growth opportunities.",
      },
      {
        step: "02",
        title: "Strategy Formulation & Creative Execution",
        description: "We develop customized advertising campaigns, build conversion-focused landing pages, and roll out technical SEO enhancements.",
      },
      {
        step: "03",
        title: "Campaign Launch, Testing & Scale",
        description: "We launch multi-channel campaigns, analyze conversion analytics daily, and aggressively scale top-performing channels.",
      },
    ],
    ctaHeadline: "Ready to Accelerate Your Digital Growth?",
    ctaSubtext: "Request a complimentary digital marketing audit and customized growth roadmap from our senior strategists.",
    ctaButtonText: "Get a Free Marketing Audit",
    ctaButtonLink: "/contact?service=digital-marketing",
  },

  // ── 5. E-COMMERCE SOLUTIONS ────────────────────────────────────────────────
  {
    id: "ecommerce-solutions",
    slug: "ecommerce-solutions",
    title: "E-Commerce Solutions",
    shortDescription: "Custom storefronts, Shopify Plus, payment gateway integrations, and high-performance digital commerce platforms built to convert.",
    description: "Modern online consumers demand instantaneous page speeds, intuitive navigation, and frictionless checkout experiences. Visha IT Solutions develops high-conversion e-commerce platforms and omnichannel digital commerce architectures that scale seamlessly with your sales volume.",
    iconName: "ShoppingCart",
    subServices: [
      "Custom E-Commerce Storefronts",
      "Shopify & Shopify Plus Development",
      "WooCommerce & Magento Platforms",
      "Payment Gateway Integration",
      "ERP, CRM & Warehouse Integration",
      "Checkout & Speed Optimization",
    ],
    features: [
      "Sub-1.5s Mobile Page Load Times",
      "1-Click Frictionless Checkout Flows",
      "Automated Shipping & Inventory Sync",
      "Multi-Currency & Regional Taxes",
    ],
    ctaText: "Build Your Online Store",
    ctaLink: "/contact?service=ecommerce-solutions",
    image: "/services/e-commerce-solutions.jpg",
    badge: "Digital Commerce",
    heroPrimaryText: "Launch Online Store",
    heroPrimaryLink: "/contact?service=ecommerce-solutions",
    heroSecondaryText: "Explore Features",
    heroSecondaryLink: "#what-we-deliver",
    deliverables: [
      {
        title: "Custom Storefront Development",
        description: "Bespoke digital storefronts engineered with Next.js, headless commerce, or Shopify Plus for unmatched speed and flexible product experiences.",
        points: [
          "Mobile-first responsive architecture designed for rapid browsing",
          "Sub-1.5s page load speeds eliminating customer bounce rates",
          "Custom product configurators, bundles, and dynamic variants",
          "Enterprise headless commerce & microservices integration",
        ],
      },
      {
        title: "Payment Gateway & 1-Click Checkout",
        description: "Integration of global and domestic payment gateways engineered to minimize cart abandonment and secure every transaction.",
        points: [
          "Support for Razorpay, Stripe, Cashfree, UPI, cards & NetBanking",
          "Streamlined single-page checkout journeys to maximize conversion",
          "Multi-currency conversion and automated regional tax computation",
          "PCI-DSS Level 1 compliant secure payment transaction handling",
        ],
      },
      {
        title: "Automated Logistics & Inventory Sync",
        description: "Seamless real-time connections between your digital storefront, warehouse ERPs, and courier delivery networks.",
        points: [
          "Real-time inventory synchronization across warehouses & stores",
          "Automated shipping label generation (Shiprocket, Delhivery, FedEx)",
          "Automated customer order tracking and WhatsApp notifications",
          "Unified Customer Data Platform (CDP) for repeat purchases",
        ],
      },
      {
        title: "Speed Optimization & Store Scaling",
        description: "Continuous architectural tuning to ensure flawless store stability during high-volume sales events and promotional flash sales.",
        points: [
          "AI-driven product recommendations and dynamic cross-selling",
          "Automated abandoned cart recovery workflows via email & SMS",
          "Rich schema structured data optimization for Google Shopping",
          "High-concurrency infrastructure handling 50,000+ simultaneous shoppers",
        ],
      },
    ],
    benefits: [
      {
        title: "Blazing Fast Mobile Speed",
        description: "Sub-second loading times keep mobile shoppers engaged, driving higher conversions and Google search ranking.",
        iconName: "Zap",
      },
      {
        title: "Frictionless 1-Click Checkout",
        description: "Optimized payment flows drastically reduce checkout abandonment and boost completed transaction rates.",
        iconName: "ShoppingCart",
      },
      {
        title: "Enterprise Payment Security",
        description: "Full PCI-DSS compliance, SSL certificates, and automated fraud prevention safeguard your revenue.",
        iconName: "ShieldCheck",
      },
      {
        title: "Omnichannel Multi-Store Sync",
        description: "Manage product catalogs, inventory, and orders across your website, Amazon, and retail stores from one hub.",
        iconName: "Layers",
      },
      {
        title: "Automated Courier Fulfillment",
        description: "Automate shipping pickups, tracking numbers, and customer delivery alerts to reduce operational costs.",
        iconName: "CheckCircle2",
      },
      {
        title: "Flash Sale Scalability",
        description: "Cloud-native hosting guarantees your store stays responsive even during major peak festival traffic surges.",
        iconName: "Database",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Catalog Architecture & UX Wireframing",
        description: "We map product taxonomy, design conversion-focused mobile UI wireframes, and specify payment and courier delivery requirements.",
      },
      {
        step: "02",
        title: "Storefront Development & API Integrations",
        description: "We develop your store, integrate secure payment gateways, configure inventory databases, and set up automated notifications.",
      },
      {
        step: "03",
        title: "Security Testing, Launch & Growth Support",
        description: "We perform rigorous end-to-end checkout testing, deploy on high-performance cloud hosting, and monitor sales metrics.",
      },
    ],
    ctaHeadline: "Ready to Launch or Scale Your E-Commerce Store?",
    ctaSubtext: "Get a bespoke online store built for high conversions, lightning speed, and effortless operational management.",
    ctaButtonText: "Launch Your Store",
    ctaButtonLink: "/contact?service=ecommerce-solutions",
  },

  // ── 6. TRAINING & CAREER DEVELOPMENT ───────────────────────────────────────
  {
    id: "training-and-career-development",
    slug: "training-and-career-development",
    title: "Training & Career Development",
    shortDescription: "Industry-aligned tech masterclasses, live capstone projects, 1:1 mentorship, and 100% placement support for aspiring software engineers.",
    description: "The gap between university curriculums and modern enterprise engineering expectations has never been wider. Visha IT Solutions bridges this divide with project-driven training masterclasses, direct architectural mentorship, and proven corporate placement assistance.",
    iconName: "GraduationCap",
    subServices: [
      "Python Full Stack Development",
      "MERN Stack (React, Node.js, Next.js)",
      ".NET Enterprise Full Stack",
      "Cloud & DevOps Masterclasses",
      "Corporate Tech Upskilling",
      "100% Placement Assistance & Mock Interviews",
    ],
    features: [
      "100% Practical Capstone Projects",
      "Mentorship by Senior Architects",
      "Direct Corporate Referral Network",
      "Industry-Recognized Certification",
    ],
    ctaText: "Join Training Programs",
    ctaLink: "/training",
    image: "/services/training-and-career-development.jpg",
    badge: "Career Launchpad",
    heroPrimaryText: "View Masterclasses",
    heroPrimaryLink: "/training",
    heroSecondaryText: "Explore Curriculum",
    heroSecondaryLink: "#what-we-deliver",
    deliverables: [
      {
        title: "Full Stack Development Masterclasses",
        description: "Intensive, project-driven bootcamps in Python Full Stack, MERN Stack (React/Next.js/Node.js), and .NET Core enterprise development.",
        points: [
          "Hands-on coding curriculum updated for current 2026 industry standards",
          "Production-grade code reviews on GitHub by senior tech leads",
          "Building microservices, REST APIs, and modern cloud architectures",
          "Industry-recognized course completion certification",
        ],
      },
      {
        title: "1:1 Mentorship & Capstone Projects",
        description: "Personalized weekly mentorship from senior software engineers currently leading production teams at tier-1 software companies.",
        points: [
          "1:1 weekly architecture mentoring, debugging, and code reviews",
          "Building complex portfolio-ready capstone enterprise applications",
          "Best coding practices, Clean Code, and System Design fundamentals",
          "Hands-on Docker containerization, CI/CD pipelines, and cloud hosting",
        ],
      },
      {
        title: "Corporate Upskilling & Team Training",
        description: "Tailored enterprise training cohorts designed to upskill corporate teams on cloud migrations, modern JavaScript, and AI workflows.",
        points: [
          "Custom syllabus tailored to your company's technology stack",
          "Interactive hands-on sandbox labs with live cloud environments",
          "Flexible weekend, evening, or hybrid delivery formats",
          "Comprehensive pre- and post-training competency assessments",
        ],
      },
      {
        title: "Placement Drives & Interview Preparation",
        description: "Comprehensive career support, technical mock interview rounds, ATS resume optimization, and direct referrals to hiring partners.",
        points: [
          "Resume and LinkedIn profile optimization by technical recruiters",
          "Rigorous technical mock interviews and live whiteboard challenges",
          "Direct interview referrals to our network of 200+ partner companies",
          "Continuous placement guidance until candidate accepts a job offer",
        ],
      },
    ],
    benefits: [
      {
        title: "Industry-Aligned Curriculum",
        description: "Learn modern frameworks and toolchains directly requested by software engineering hiring managers today.",
        iconName: "GraduationCap",
      },
      {
        title: "100% Project-Based Learning",
        description: "Build, debug, and deploy real full-stack web applications to showcase directly in your GitHub portfolio.",
        iconName: "Code2",
      },
      {
        title: "Direct Placement Assistance",
        description: "Leverage our active corporate recruiting network to land interviews at top tech firms and startups.",
        iconName: "Briefcase",
      },
      {
        title: "Guidance from Senior Architects",
        description: "Receive practical feedback and architectural advice from engineers working at top product companies.",
        iconName: "UserCheck",
      },
      {
        title: "Flexible Learning Formats",
        description: "Choose between live interactive online classes, weekend bootcamps, and on-demand session recordings.",
        iconName: "Clock",
      },
      {
        title: "Mock Interviews & Resume Polish",
        description: "Master coding rounds, system design discussions, and HR interviews with confidence.",
        iconName: "FileCheck",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Skill Assessment & Roadmap Planning",
        description: "We assess your current coding knowledge, career aspirations, and target job roles to define a personalized learning roadmap.",
      },
      {
        step: "02",
        title: "Hands-On Coding & Capstone Projects",
        description: "You attend live interactive sessions, write production code, build enterprise capstones, and get weekly mentor reviews.",
      },
      {
        step: "03",
        title: "Mock Interviews & Placement Launch",
        description: "We polish your tech resume, conduct thorough technical mock interviews, and schedule direct interviews with corporate hiring partners.",
      },
    ],
    ctaHeadline: "Ready to Launch Your Career in Modern Tech?",
    ctaSubtext: "Join our career-focused masterclasses to gain the practical coding skills, portfolio, and placement support you need.",
    ctaButtonText: "Explore Training Masterclasses",
    ctaButtonLink: "/training",
  },
];
