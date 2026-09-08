import { MetadataRoute } from 'next';
import { VISHA_SERVICES } from '@/data/vishaServices';
import { VISHA_TRAINING_PROGRAMS } from '@/data/vishaTraining';
import { VISHA_PROJECTS } from '@/data/vishaProjects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vishait.com';
  const currentDate = new Date();

  // Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/training`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  // Dynamic Service Pages
  const serviceRoutes: MetadataRoute.Sitemap = VISHA_SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Dynamic Training Program Pages
  const trainingRoutes: MetadataRoute.Sitemap = VISHA_TRAINING_PROGRAMS.map((t) => ({
    url: `${baseUrl}/training/${t.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Dynamic Project Pages
  const projectRoutes: MetadataRoute.Sitemap = VISHA_PROJECTS.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...trainingRoutes,
    ...projectRoutes,
  ];
}
