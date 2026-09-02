import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load env vars
dotenv.config({ path: '.env' });

// We need to define the schema here or import it
import Service from '../src/lib/models/Service';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const services = [
  {
    title: 'Recruitment & Staffing',
    slug: 'recruitment-and-staffing',
    shortDescription: 'Comprehensive recruitment and staffing solutions to build high-performing teams.',
    description: 'We offer end-to-end recruitment and staffing services designed to connect you with top talent across industries. Whether you need specialized IT professionals or general workforce solutions, our tailored approach ensures you find the right fit for your organizational culture and goals.',
    icon: 'Users',
    features: [
      'IT Recruitment',
      'Non-IT Recruitment',
      'Permanent Staffing',
      'Contract Staffing',
      'Contract-to-Hire',
      'Bulk Hiring',
      'Remote / Hybrid Hiring'
    ],
    ctaText: 'Hire Talent →',
    order: 1,
  },
  {
    title: 'Payroll & HR Services',
    slug: 'payroll-and-hr-services',
    shortDescription: 'Streamlined HR operations and accurate payroll management for your business.',
    description: 'Simplify your human resources management with our comprehensive HR and payroll services. We handle the complexities of payroll processing, compliance, and employee administration, allowing you to focus on your core business operations while ensuring your team is well-supported.',
    icon: 'Settings',
    features: [
      'Payroll Processing',
      'Salary & Payslip Management',
      'Attendance & Leave Management',
      'Employee Documentation',
      'HR Operations',
      'Payroll Reports',
      'Compliance Support'
    ],
    ctaText: 'Get Payroll Support →',
    order: 2,
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    shortDescription: 'Data-driven marketing strategies to increase your visibility and ROI.',
    description: 'Elevate your online presence with our results-oriented digital marketing services. From strategic SEO to targeted ad campaigns, we leverage the latest tools and insights to connect your brand with the right audience, drive engagement, and maximize your return on investment.',
    icon: 'Megaphone',
    features: [
      'Digital Marketing Strategy',
      'SEO',
      'Social Media Marketing',
      'Google Ads',
      'Meta Ads',
      'Content & Creative',
      'Lead Generation',
      'Analytics & Reporting'
    ],
    ctaText: 'Grow Your Business →',
    order: 3,
  },
  {
    title: 'E-Commerce Solutions',
    slug: 'e-commerce-solutions',
    shortDescription: 'Build powerful, scalable, and secure e-commerce platforms that drive sales.',
    description: 'Transform your retail business with our bespoke e-commerce solutions. We build secure, user-friendly online stores that offer seamless shopping experiences. Our holistic approach covers everything from platform development and payment integration to ongoing management and marketing.',
    icon: 'Code',
    features: [
      'E-Commerce Website Development',
      'Online Store Setup',
      'Product Catalogue Management',
      'Payment Gateway Integration',
      'Order & Inventory Management',
      'E-Commerce Marketing',
      'Customer Support',
      'E-Commerce Analytics'
    ],
    ctaText: 'Build Your Online Store →',
    order: 4,
  },
  {
    title: 'Training & Career Development',
    slug: 'training-and-career-development',
    shortDescription: 'Empowering individuals and teams with practical skills and career guidance.',
    description: 'Unlock your potential with our specialized training programs. Designed for both individuals seeking career advancement and corporations aiming to upskill their workforce, our courses combine theoretical knowledge with practical, hands-on experience to ensure real-world readiness.',
    icon: 'GraduationCap',
    features: [
      'IT Training',
      'Digital Marketing Training',
      'Professional Skills Training',
      'Practical Project Training',
      'Resume Building',
      'Interview Preparation',
      'Career Guidance',
      'Corporate Training'
    ],
    ctaText: 'Explore Training →',
    order: 5,
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected to MongoDB.');

    // Clear existing services
    console.log('Clearing existing services...');
    await Service.deleteMany({});

    // Insert new services
    console.log('Inserting new services...');
    for (const service of services) {
      await Service.create(service);
      console.log(`Inserted: ${service.title}`);
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();
