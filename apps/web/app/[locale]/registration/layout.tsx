
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Registration — ACCP 2026",
    description: "View fees, deadlines, and register online for ACCP 2026.",
    keywords: "registration, fees, accp 2026",
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
