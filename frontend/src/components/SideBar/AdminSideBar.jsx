import { FaHome, FaPlus, FaCubes, FaBlogger, FaList, FaUserEdit, FaExclamationTriangle } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { MdAddModerator, MdOutlineLibraryBooks } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, useSidebar } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link, useLocation } from "react-router-dom";
import { BadgeCheck, ChevronRight, ChevronsUpDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LogoutBtn from "@/components/admin/AdminLogoutBtn";
import { BiRevision } from "react-icons/bi";

const navBar = [
    { name: "Main Site", Icon: FaHome, urlLink: "/" },
    {
        name: "Dashboard",
        Icon: AiFillDashboard,
        urlLink: "/admin/dashboard",
        segment: "dashboard",
    },
    {
        name: "Manage Enquiry",
        Icon: FaRegMessage,
        innerLists: [
            {
                name: "Enquiry",
                urlLink: "/admin/enquiry/enquiry-list",
            },
        ],
        segment: "users",
    },
    {
        name: "Manage Moderator",
        Icon: MdAddModerator,
        innerLists: [
            {
                name: "Add Moderator",
                urlLink: "/admin/moderator/add-moderator",
                Icon: FaPlus,
            },
            {
                name: "Moderator List",
                urlLink: "/admin/moderator/moderator-list",
            },
        ],
        segment: "moderator",
    },
    {
        name: "Manage Writer",
        Icon: FaUserEdit,
        innerLists: [
            {
                name: "Add Writer",
                urlLink: "/admin/writers/add-writer",
                Icon: FaPlus,
            },
            {
                name: "Writer List",
                urlLink: "/admin/writers/writer-list",
            },
        ],
        segment: "writer",
    },
    {
        name: "Manage Category",
        Icon: FaCubes,
        innerLists: [
            {
                name: "Add Category",
                urlLink: "/admin/category/add-category",
                Icon: FaPlus,
            },
            {
                name: "Category List",
                urlLink: "/admin/category/category-list",
            },
        ],
        segment: "sub-category",
    },
    {
        name: "Manage Blogs",
        Icon: FaBlogger,
        innerLists: [
            {
                name: "Approved Blogs",
                urlLink: "/admin/blogs/approved-blogs",
            },
            {
                name: "Revision Blogs",
                urlLink: "/admin/blogs/revision-blogs",
                Icon: BiRevision,
            },
            {
                name: "Rejected Blogs",
                urlLink: "/admin/blogs/rejected-blogs",
                Icon: FaExclamationTriangle,
            },
            {
                name: "All Blogs",
                urlLink: "/admin/blogs/all-blogs",
                Icon: MdOutlineLibraryBooks,
            },
        ],
        segment: "users",
    },
];
const AdminSideBar = ({ user, ...props }) => {
    const { pathname } = useLocation();
    const segment = pathname.split("/")[2] || "";
    const { isMobile } = useSidebar();

    return (
        <Sidebar {...props} className="select-none">
            <SidebarContent className="flex flex-col justify-between py-2">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navBar.map(items => {
                                if (items?.innerLists) {
                                    return (
                                        <Collapsible defaultOpen={segment === items?.segment} key={items?.name} className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton>
                                                    <ChevronRight className="transition-transform" />
                                                    {items.Icon && <items.Icon />}
                                                    {items?.name}
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {items?.innerLists.map(item => (
                                                        <SidebarMenuButton key={item?.name} className="data-[active=true]:bg-transparent" asChild>
                                                            <Link to={item?.urlLink}>
                                                                {item.Icon ? <item.Icon /> : <FaList />}
                                                                {item?.name}
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    );
                                } else {
                                    return (
                                        <SidebarMenuItem key={items?.name}>
                                            <SidebarMenuButton asChild>
                                                <Link to={items?.urlLink} target={items?.name === "Main Site" ? "_blank" : "_self"}>
                                                    {items.Icon && <items.Icon />}
                                                    {items?.name}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                }
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarMenu className="px-2">
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src="https://ui.shadcn.com/avatars/shadcn.jpg" alt={user?.username} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user?.username} - Admin</span>
                                        <span className="truncate text-xs">{user?.email}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src="https://ui.shadcn.com/avatars/shadcn.jpg" alt={user?.username} />
                                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">{user?.username}</span>
                                            <span className="truncate text-xs">{user?.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                        <LogoutBtn />
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
};

export default AdminSideBar;
