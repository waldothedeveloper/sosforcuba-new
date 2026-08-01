import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
export const metadata: Metadata = { title: "Privacy", description: "Privacy information for the content-only SOS for Cuba website." };
export default function Page() { return <ContentPage slug="privacy" />; }
