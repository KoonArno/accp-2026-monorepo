import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Program — ACCP 2026",
    description: "Explore plenary, symposia, workshops, and oral/e-poster sessions.",
    keywords: ["program", "plenary", "symposia", "ACCP 2026", "clinical pharmacy conference"],
}

export default function ProgramLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
