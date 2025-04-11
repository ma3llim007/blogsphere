import { currentYear } from "@/utils/utils";

const AdminFooter = () => {
    return (
        <footer className="border-t px-4 py-4 text-center select-none">
            <div className="text-base font-bold">© {currentYear()} BlogSphere. All Rights Reserved.</div>
        </footer>
    );
};

export default AdminFooter;
