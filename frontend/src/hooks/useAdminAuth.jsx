import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAdminAuth = () => {
    const navigate = useNavigate();

    // Using React Query to check authentication status
    const { data, isError, isLoading } = useQuery({
        queryKey: ["authStatus"],
        queryFn: () => crudService.get("/admin/auth/check-session"),
        retry: false,
        staleTime: 5 * 60 * 1000,
        onError: error => toastService.error(error.message || "Error checking authentication status"),
    });

    // Select admin and status from Redux store
    const { status, admin } = useSelector(state => state.adminAuth);
    const isAuthenticated = data?.data?.isAuthenticated;

    useEffect(() => {
        if (isLoading) return;
        const isAuthenticated = data?.data?.isAuthenticated;
        const hasOwnerShip = admin?.asOwnerShip;

        if (!isAuthenticated || !hasOwnerShip || !status) {
            navigate("/admin/auth/login", { replace: true });
        }
    }, [admin, isAuthenticated, isError, isLoading]);

    return { admin, isError, isLoading };
};

export default useAdminAuth;
