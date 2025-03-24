import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import toastService from "@/services/toastService";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";
import WriterSideBar from "@/components/sidebar/WriterSideBar";
import useWriterAuth from "@/hooks/useWriterAuth";
import Loading from "@/components/common/Loading";

const WriterLayout = () => {
    const { isError, isLoading, writer } = useWriterAuth();

    // Apply dark mode only when inside the admin panel
    useEffect(() => {
        document.documentElement.classList.add("dark"); // Enable dark mode for admin
        return () => document.documentElement.classList.remove("dark"); // Remove when leaving admin panel
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        toastService.error("Please Log In To Access The Writer Panel");
        return null;
    }

    return (
        <SidebarProvider>
            <WriterSideBar user={writer} />
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

export default WriterLayout;
