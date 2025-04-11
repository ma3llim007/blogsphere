import Loading from "@/components/common/Loading";
import ModeratorSideBar from "@/components/sidebar/ModeratorSideBar";
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
                <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Outlet />
                </section>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default ModeratorLayout;
