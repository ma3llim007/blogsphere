import Loading from "@/components/common/Loading";
import Footer from "@/components/moderator/Footer";
import Header from "@/components/moderator/Header";
import ModeratorSideBar from "@/components/Sidebar/ModeratorSideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import useModeratorAuth from "@/hooks/useModeratorAuth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ModeratorLayout = () => {
    const { isLoading, moderator } = useModeratorAuth();
    // Apply dark mode only when inside the admin panel
    useEffect(() => {
        document.documentElement.classList.add("dark"); // Enable dark mode for admin
        return () => document.documentElement.classList.remove("dark"); // Remove when leaving admin panel
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <SidebarProvider>
            <ModeratorSideBar user={moderator} />
            <SidebarInset>
                <Header />
                <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Outlet />
                </section>
                <Footer />
            </SidebarInset>
        </SidebarProvider>
    );
};

export default ModeratorLayout;
