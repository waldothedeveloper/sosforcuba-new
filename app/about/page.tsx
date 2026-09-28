import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata({ title: "About", description: "About SOS for Cuba: an independent advocacy project preserving testimony, history, and human-rights reporting for a free Cuba.", path: "/about" });
export default function Page() { return <ContentPage slug="about" />; }
