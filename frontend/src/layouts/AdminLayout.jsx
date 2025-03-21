import Footer from "@/components/Admin/Footer";
import Header from "@/components/Admin/Header";
import Loading from "@/components/Loaders/Loading";
import AdminSideBar from "@/components/SideBar/AdminSideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import useAdminAuth from "@/hooks/useAdminAuth";
import toastService from "@/services/toastService";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    const { admin, isError, isLoading } = useAdminAuth();

    // Apply dark mode only when inside the admin panel
    useEffect(() => {
        document.documentElement.classList.add("dark"); // Enable dark mode for admin
        return () => document.documentElement.classList.remove("dark"); // Remove when leaving admin panel
    }, []);
    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        toastService.error("Please Log In To Access The Admin Panel");
        return null;
    }

    return (
        <SidebarProvider>
            <AdminSideBar user={admin} />
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

export default AdminLayout;
