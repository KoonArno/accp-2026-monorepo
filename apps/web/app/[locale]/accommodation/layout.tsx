import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Accommodation — ACCP 2026",
    description: "Book partner hotels with special conference rates near Centara Grand & Bangkok Convention Centre at CentralWorld, Bangkok.",
    keywords: ["hotel", "travel", "visa", "Bangkok", "ACCP 2026", "accommodation"],
}

export default function AccommodationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
