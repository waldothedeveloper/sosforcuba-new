import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata({ title: "July 11, 2021", description: "A guide to the July 11 protests, government response, internet shutdown, and detentions.", path: "/july-11" });
export default function Page() { return <ContentPage slug="july-11" />; }
