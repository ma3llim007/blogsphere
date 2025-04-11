import Loading from "@/components/common/Loading";
import ModeratorSideBar from "@/components/sidebar/ModeratorSideBar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useModeratorAuth from "@/hooks/useModeratorAuth";
import { currentYear } from "@/utils/utils";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

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
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 select-none">
                    <div className="flex-grow flex items-center gap-2">
                        <SidebarTrigger className="-ml-1 cursor-pointer" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <Link to={"/admin/dashboard"}>Home</Link>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Outlet />
                </section>
                <footer className="border-t px-4 py-4 text-center select-none">
                    <div className="text-base font-bold">© {currentYear()} BlogSphere. All Rights Reserved.</div>
                </footer>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default ModeratorLayout;
