import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, useSidebar } from "../ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { BadgeCheck, ChevronRight, ChevronsUpDown } from "lucide-react";
import { FaBlogger, FaExclamationTriangle, FaFileAlt, FaHome, FaList, FaPlus, FaRegClock } from "react-icons/fa";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuLabel } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AiFillDashboard } from "react-icons/ai";
import LogOutWriter from "../writer/LogOutWriter";
import { MdOutlineLibraryBooks, MdPassword } from "react-icons/md";
import { BiRevision } from "react-icons/bi";

const navBar = [
    { name: "Main Site", Icon: FaHome, urlLink: "/" },
    {
        name: "Dashboard",
        Icon: AiFillDashboard,
        urlLink: "/writer/dashboard",
        segment: "dashboard",
    },
    {
        name: "Manage Blogs",
        Icon: FaBlogger,
        innerLists: [
            {
                name: "Add Blog",
                urlLink: "/writer/blogs/add-blog",
                Icon: FaPlus,
            },
            {
                name: "Draft Blogs",
                urlLink: "/writer/blogs/draft-blogs",
                Icon: FaFileAlt,
            },
            {
                name: "Pending Blogs",
                urlLink: "/writer/blogs/pending-blogs",
                Icon: FaRegClock,
            },
            {
                name: "Approved Blogs",
                urlLink: "/writer/blogs/approved-blogs",
            },
            {
                name: "Revision Blogs",
                urlLink: "/writer/blogs/revision-blogs",
                Icon: BiRevision,
            },
            {
                name: "Rejected Blogs",
                urlLink: "/writer/blogs/rejected-blogs",
                Icon: FaExclamationTriangle,
            },
            {
                name: "All Blogs",
                urlLink: "/writer/blogs/blog-list",
                Icon: MdOutlineLibraryBooks,
            },
        ],
        segment: "blogs",
    },
];

const WriterSideBar = ({ user, ...props }) => {
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
                                        <span className="truncate font-semibold">{user?.username} - Writer</span>
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
                                    <DropdownMenuItem className="cursor-pointer" asChild>
                                        <Link to="/writer/account">
                                            <BadgeCheck />
                                            Account
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer" asChild>
                                        <Link to="/writer/change-password">
                                            <MdPassword />
                                            Change Password
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                        <LogOutWriter />
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

export default WriterSideBar;
