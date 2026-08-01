import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
export const metadata: Metadata = { title: "Resources", description: "Primary and trusted sources for learning about Cuba and human rights." };
export default function Page() { return <ContentPage slug="resources" />; }
