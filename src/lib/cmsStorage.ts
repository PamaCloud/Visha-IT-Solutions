import fs from 'fs';
import path from 'path';
import { VISHA_SERVICES } from '../data/vishaServices';
import { VISHA_PROJECTS } from '../data/vishaProjects';
import { VISHA_TRAINING_PROGRAMS } from '../data/vishaTraining';

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'cms_data');

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readPersistedFile<T>(filename: string, defaultData: T[]): T[] {
  ensureDirectory();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error(`Failed to read persisted file ${filename}:`, err);
  }

  // If not yet saved to disk, write default data
  try {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf8');
  } catch (err) {
    console.error(`Failed to initialize persisted file ${filename}:`, err);
  }
  return defaultData;
}

export function writePersistedFile<T>(filename: string, data: T[]): boolean {
  ensureDirectory();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Failed to write persisted file ${filename}:`, err);
    return false;
  }
}

// Initial defaults for Visha IT
export const initialCmsServices = VISHA_SERVICES.map((s, idx) => ({
  _id: `cms_service_${s.slug || idx}`,
  title: s.title,
  slug: s.slug,
  badge: s.badge || "Enterprise Grade",
  shortDescription: s.shortDescription,
  description: s.description || s.shortDescription,
  iconName: s.iconName || "Users",
  subServices: s.subServices || [],
  features: s.features || [],
  ctaText: s.ctaText || "Explore Service →",
  ctaLink: `/contact?service=${s.slug}`,
  image: s.image,
  isActive: true,
  order: idx + 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const initialCmsProjects = VISHA_PROJECTS.map((p, idx) => ({
  _id: `cms_project_${p.slug || idx}`,
  title: p.title,
  slug: p.slug,
  clientName: p.clientName || "Enterprise Client",
  category: p.category || "Web Application",
  badge: p.badge || "Production Deployed",
  shortDescription: p.shortDescription || p.description?.slice(0, 160),
  description: p.description,
  technologies: p.technologies || [],
  metrics: p.metrics || [],
  deliverables: p.deliverables || [],
  image: p.image,
  outcome: p.outcome || "Production deployed enterprise software",
  projectUrl: "https://vishait.com",
  featured: true,
  isActive: true,
  order: idx + 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const initialCmsTraining = VISHA_TRAINING_PROGRAMS.map((t, idx) => ({
  _id: `cms_training_${t.slug || idx}`,
  title: t.title,
  slug: t.slug,
  badge: t.badge || "Most Popular",
  shortDescription: t.shortDescription,
  description: t.description,
  duration: t.duration,
  eligibility: "Students & Working Professionals",
  mode: t.mode,
  level: t.level || "Beginner to Enterprise",
  technologies: t.technologies || [],
  syllabus: t.syllabus || [],
  modules: t.modules || [],
  careerRoles: t.careerRoles || [],
  image: t.image || "/services/training-and-career-development.jpg",
  curriculum: t.syllabus?.join(", ") || "",
  projectDetails: `${t.title} Capstone Project`,
  fee: "INR 35,000",
  status: "upcoming",
  isActive: true,
  order: idx + 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));
