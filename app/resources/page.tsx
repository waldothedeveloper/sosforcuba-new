import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata({ title: "Resources", description: "Primary and trusted sources for learning about Cuba and human rights.", path: "/resources" });
export default function Page() { return <ContentPage slug="resources" />; }
