import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useWriterAuth = () => {
    const navigate = useNavigate();

    // Using React Query to check authentication status
    const { data, isError, isLoading } = useQuery({
        queryKey: ["writerStatus"],
        queryFn: () => crudService.get("writer/auth/check-session-writer", true),
        retry: false,
        staleTime: 5 * 60 * 1000,
        onError: error => toastService.error(error.message || "Error checking authentication status"),
    });

    // Select writer and status from Redux store
    const { status, writer } = useSelector(state => state.writerAuth);
    const isAuthenticated = data?.data?.isAuthenticated;

    useEffect(() => {
        if (isLoading) return;
        const isAuthenticated = data?.data?.isAuthenticated;

        if (!isAuthenticated || !writer || !status) {
            navigate("/writer/auth/login", { replace: true });
        }
    }, [writer, isAuthenticated, isError, isLoading]);

    return { writer, isError, isLoading };
};

export default useWriterAuth