import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata({ title: "Privacy", description: "Privacy information for the content-only SOS for Cuba website.", path: "/privacy" });
export default function Page() { return <ContentPage slug="privacy" />; }
