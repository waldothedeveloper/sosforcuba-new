import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata({ title: "Human rights in Cuba", description: "An overview of documented restrictions and human-rights concerns in Cuba.", path: "/human-rights" });
export default function Page() { return <ContentPage slug="human-rights" />; }
