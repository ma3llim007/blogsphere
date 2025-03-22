import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import toastService from "@/services/toastService";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";
import WriterSideBar from "@/components/sidebar/WriterSideBar";

const WriterLayout = () => {
    const navigate = useNavigate();
    // Apply dark mode only when inside the admin panel
    useEffect(() => {
        document.documentElement.classList.add("dark"); // Enable dark mode for admin
        return () => document.documentElement.classList.remove("dark"); // Remove when leaving admin panel
    }, []);

    // Select writer and status from Redux store
    const { status, writer } = useSelector(state => state.writerAuth);

    useEffect(() => {
        if (!status || !writer) {
            toastService.error("Please Log In To Access The Writer Panel");
            navigate("/writer/auth/login", { replace: true });
        }
    }, [status, writer, navigate]);

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
