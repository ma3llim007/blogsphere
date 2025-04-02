import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { logoutWriter } from "@/store/features/writer/writerAuthSlice";
import { storePersistor } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import queryClient from "@/services/queryClientConfig";

const LogOutWriter = () => {
    const dispatch = useDispatch();
    const { writer } = useSelector(state => state.writerAuth);

    const { mutate } = useMutation({
        mutationFn: () => crudService.post("writer/auth/logout"),
        onSuccess: async data => {
            dispatch(logoutWriter());
            toastService.info(data?.message);
            queryClient.clear();
            await storePersistor.purge();
        },
        onError: error => {
            toastService.error(error.message || "Something Went Wrong While Log-Out");
        },
    });

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="Danger w-full cursor-pointer">Log Out</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white dark:bg-slate-950">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to log out? This will end your current session.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="Danger cursor-pointer" onClick={() => mutate(writer?._id)}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default LogOutWriter;
