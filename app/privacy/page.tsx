import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata({ title: "Privacy", description: "How the content-only SOS for Cuba website handles privacy: no accounts, forms, donations, or tracking, and only standard hosting request logs.", path: "/privacy" });
export default function Page() { return <ContentPage slug="privacy" />; }
