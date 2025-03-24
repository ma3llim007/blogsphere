import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useModeratorAuth = () => {
    const navigate = useNavigate();

    // Using React Query to check authentication status
    const { data, isError, isLoading } = useQuery({
        queryKey: ["writerStatus"],
        queryFn: () => crudService.get("moderator/auth/check-session-moderator", true),
        retry: false,
        staleTime: 5 * 60 * 1000,
        onError: error => toastService.error(error.message || "Error checking authentication status"),
    });

    // Select moderator and status from Redux store
    const { status, moderator } = useSelector(state => state.moderatorAuth);

    // Memoized authentication check to prevent unnecessary recalculations
    const isAuthenticated = useMemo(() => data?.data?.isAuthenticated, [data]);

    useEffect(() => {
        if (isLoading) return;

        if (!isAuthenticated || !moderator || !status) {
            navigate("/moderator/auth/login", { replace: true });
        }
    }, [moderator, isAuthenticated, isError, isLoading, navigate, status]);

    return { moderator, isError, isLoading };
};

export default useModeratorAuth;
