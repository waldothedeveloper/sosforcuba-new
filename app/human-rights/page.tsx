import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
export const metadata: Metadata = { title: "Human rights in Cuba", description: "An overview of documented restrictions and human-rights concerns in Cuba." };
export default function Page() { return <ContentPage slug="human-rights" />; }
