import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const PageHeader = ({ homeUrl = "/admin/dashboard", title, controller, controllerUrl, subController, subControllerUrl, page }) => {
    return (
        <section className="w-full flex items-center justify-between py-2 select-none">
            <div className="flex items-end gap-3">
                <h1 className="text-3xl font-bold">{title}</h1>
                <h2 className="text-xl font-medium text-gray-600 underline">{page}</h2>
            </div>
            <Breadcrumb className="hidden lg:block">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link className="flex gap-2 items-center" to={homeUrl}>
                            <FaHome />
                            Home
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Link to={controllerUrl}>{controller}</Link>
                    </BreadcrumbItem>
                    {subController && subControllerUrl ? (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link to={subControllerUrl}>{subController}</Link>
                            </BreadcrumbItem>
                        </>
                    ) : (
                        ""
                    )}
                    {page && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="select-none">{page}</BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </section>
    );
};

export default PageHeader;
