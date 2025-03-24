import Loading from "@/components/common/Loading";
import useModeratorAuth from "@/hooks/useModeratorAuth";
import toastService from "@/services/toastService";
import { useEffect } from "react";

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
    return <div>ModeratorLayout</div>;
};

export default ModeratorLayout;
