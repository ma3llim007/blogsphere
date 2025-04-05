import { Link, NavLink, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { GoSidebarExpand } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { capitalizeWords } from "@/utils/utils";
import { useState } from "react";
import HeaderSidebar from "./HeaderSidebar";

const Header = ({ categories }) => {
    const [isOpenModel, setIsOpenModel] = useState(false);
    const location = useLocation();
    const pathName = location.pathname;

    const isCategoryPath = categories?.some(cat => pathName === `/${cat?.categorySlug}/blogs`);
    const handleModel = () => {
        setIsOpenModel(prev => !prev);
    };
    return (
        <>
            <header className="container mx-auto flex items-center justify-between py-4  px-4 gap-8">
                {/* Logo */}
                <Link to="/" className="w-16 flex-shrink-0">
                    <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703414030/black_logo_04ad91cfe6.png" alt="Logo" className="w-full h-auto object-cover" />
                </Link>

                {/* Navigation & Search */}
                <div className="hidden flex-grow lg:flex items-center justify-between">
                    {/* Search Input */}
                    <div className="relative flex items-center lg:w-40 xl:w-52 2xl:w-64">
                        <FaSearch className="absolute left-3 text-primary" />
                        <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:border-primary outline-none transition duration-300" />
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:block gap-6 font-medium text-lg grow justify-center">
                        <ul className="flex gap-6 text-lg justify-end">
                            <li>
                                <NavLink to="/" className={({ isActive }) => `hover:text-blue-violet transition ${isActive ? "text-blue-violet font-semibold" : ""}`}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about-us" className={({ isActive }) => `hover:text-blue-violet transition ${isActive ? "text-blue-violet font-semibold" : ""}`}>
                                    About Us
                                </NavLink>
                            </li>
                            {/* Category Dropdown */}
                            <li>
                                <DropdownMenu>
                                    <div className="flex items-center gap-1 font-medium">
                                        <DropdownMenuTrigger asChild>
                                            <button className={`flex items-center gap-1 font-medium cursor-pointer ${isCategoryPath ? "text-blue-violet" : null}`}>
                                                Category&apos;s
                                                <IoIosArrowDown />
                                            </button>
                                        </DropdownMenuTrigger>
                                    </div>
                                    <DropdownMenuContent
                                        align="start"
                                        sideOffset={10}
                                        className="min-w-[10rem] overflow-hidden p-0 shadow-md divide-gray-500 z-40 border-t-2 border-t-blue-violet rounded-t-none rounded-b-md"
                                    >
                                        {categories?.map(category => {
                                            const isActive = pathName === `/${category.categorySlug}/blogs`;
                                            return (
                                                <DropdownMenuItem key={category._id} asChild className="px-3 py-2 cursor-pointer text-base font-semibold">
                                                    <Link
                                                        to={`${category.categorySlug}/blogs`}
                                                        className={`block w-full px-4 py-2 transition ${isActive ? "text-blue-violet font-bold" : "hover:text-blue-violet"}`}
                                                    >
                                                        {capitalizeWords(category.categoryName)}
                                                    </Link>
                                                </DropdownMenuItem>
                                            );
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                            <li>
                                <NavLink to="/blogs" className={({ isActive }) => `hover:text-blue-violet transition ${isActive ? "text-blue-violet font-semibold" : ""}`}>
                                    Blogs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact-us" className={({ isActive }) => `hover:text-blue-violet transition ${isActive ? "text-blue-violet font-semibold" : ""}`}>
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <GoSidebarExpand onClick={() => setIsOpenModel(true)} className="lg:hidden cursor-pointer" size={23} />
            </header>
            <HeaderSidebar isOpenModel={isOpenModel} handleModel={handleModel} categories={categories} />
        </>
    );
};

export default Header;
