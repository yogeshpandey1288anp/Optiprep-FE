"use client";

import { SidebarProvider } from "@/context/SidebarContext";
import LayoutWrapper from "@/components/layout/AppLayout";



export default function MainSectionLayout({ children, }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <LayoutWrapper>
                {children}
            </LayoutWrapper>
        </SidebarProvider>
    );
}
