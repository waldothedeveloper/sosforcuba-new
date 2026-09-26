import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata({ title: "About", description: "About the mission and editorial approach of SOS for Cuba.", path: "/about" });
export default function Page() { return <ContentPage slug="about" />; }
