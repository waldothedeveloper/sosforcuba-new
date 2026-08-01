import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
export const metadata: Metadata = { title: "About", description: "About the mission and editorial approach of SOS for Cuba." };
export default function Page() { return <ContentPage slug="about" />; }
