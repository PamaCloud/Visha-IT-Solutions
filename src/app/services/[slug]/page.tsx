import { serviceService } from "@/services/serviceService";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ServiceDetailView from "@/components/services/ServiceDetailView";
import { VISHA_SERVICES } from "@/data/vishaServices";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await serviceService.getService(resolvedParams.slug);
  if (!service) return { title: "Service Not Found - Visha IT Solutions" };

  return {
    title: `${service.title} - Visha IT Solutions`,
    description: service.shortDescription,
  };
}

export async function generateStaticParams() {
  return VISHA_SERVICES.map((s) => ({
    slug: s.slug,
  }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = await serviceService.getService(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}
