import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toastService from "@/services/toastService";

const WriterLayout = () => {
    const navigate = useNavigate();
    // Select writer and status from Redux store
    const { status, writer } = useSelector(state => state.writerAuth);

    useEffect(() => {
        if (!status || !writer) {
            toastService.error("Please Log In To Access The Writer Panel");
            navigate("/writer/auth/login", { replace: true });
        }
    }, [status, writer, navigate]);
    return <div>WriterLayout</div>;
};

export default WriterLayout;
