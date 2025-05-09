import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import toastService from "@/services/toastService";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import crudService from "@/services/crudService";
import { logout } from "@/store/features/admin/adminAuthSlice";
import { storePersistor } from "@/store/store";
import queryClient from "@/services/queryClientConfig";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.adminAuth);

    const { mutate } = useMutation({
        mutationFn: () => crudService.post("admin/auth/logout"),
        onSuccess: data => {
            dispatch(logout());
            toastService.info(data?.message);
            queryClient.clear();
            storePersistor.purge();
        },
        onError: error => {
            toastService.error(error.message || "Something Went Wrong While Log-Out");
        },
    });

    const logoutHandler = () => {
        if (admin?._id) {
            mutate(admin?._id);
        }
    };
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="Danger w-full">Log Out</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white dark:bg-slate-950">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to log out? This will end your current session.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="Danger" onClick={logoutHandler}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default LogoutBtn;
