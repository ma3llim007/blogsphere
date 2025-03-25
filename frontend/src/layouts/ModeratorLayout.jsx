import Footer from "@/components/admin/Footer";
import Header from "@/components/admin/Header";
import Loading from "@/components/common/Loading";
import ModeratorSideBar from "@/components/sidebar/ModeratorSideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import useModeratorAuth from "@/hooks/useModeratorAuth";
import toastService from "@/services/toastService";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ModeratorLayout = () => {
    const { isError, isLoading, moderator } = useModeratorAuth();
    // Apply dark mode only when inside the admin panel
    useEffect(() => {
        document.documentElement.classList.add("dark"); // Enable dark mode for admin
        return () => document.documentElement.classList.remove("dark"); // Remove when leaving admin panel
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        toastService.error("Please Log In To Access The Moderator Panel");
        return null;
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
