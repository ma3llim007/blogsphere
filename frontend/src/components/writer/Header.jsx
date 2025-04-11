import { Link } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "../ui/breadcrumb";
import { Separator } from "../ui/separator";

const Header = () => {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 select-none">
            <div className="flex-grow flex items-center gap-2">
                <SidebarTrigger className="-ml-1 cursor-pointer" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <Link to={"/admin/dashboard"}>Home</Link>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
};

export default Header;
