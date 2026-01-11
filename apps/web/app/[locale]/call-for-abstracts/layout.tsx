
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Call for Abstracts — ACCP 2026",
    description: "Submit your abstract in clinical pharmacy, pharmacoepidemiology, education, and more before the deadline.",
    keywords: "abstracts, submission, ACCP 2026",
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
