import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageMetadata } from "@/lib/seo";
import { FitnessDetailPage } from "../../components/fitness-detail-page";
import { getFitnessDetail, getFitnessStaticParams } from "../../fitness-pages";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getFitnessStaticParams("gym");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const detail = getFitnessDetail("gym", (await params).slug);
  return detail
    ? getPageMetadata({
        title: `${detail.label} ${detail.program.crumbLabel}`,
        description: detail.summary,
        path: detail.path,
        image: detail.program.image,
      })
    : {};
}

export default async function GymFitnessDetailRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const detail = getFitnessDetail("gym", (await params).slug);
  if (!detail) notFound();
  return <FitnessDetailPage detail={detail} />;
}
