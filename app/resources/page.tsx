import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata({ title: "Resources", description: "Trusted human-rights organizations, primary sources, and research tools for verifying claims about Cuba, political prisoners, and July 11.", path: "/resources" });
export default function Page() { return <ContentPage slug="resources" />; }
