import { Link, NavLink } from "react-router-dom";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { GoSidebarExpand } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { capitalizeWords } from "@/utils/utils";
import { useState } from "react";
import HeaderSidebar from "./HeaderSidebar";

const Header = ({ categories }) => {
    const [isOpenModel, setIsOpenModel] = useState(false);

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
                        <ul className="flex gap-6 text-lg justify-center">
                            <li>
                                <NavLink to="/" className="hover:text-blue-violet transition">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about-us" className="hover:text-blue-violet transition">
                                    About Us
                                </NavLink>
                            </li>
                            {/* Category Dropdown */}
                            <li>
                                <DropdownMenu>
                                    <div className="flex items-center gap-1">
                                        <DropdownMenuTrigger asChild>
                                            <button className="flex items-center gap-1 cursor-pointer">
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
                                        {categories?.map(category => (
                                            <DropdownMenuItem key={category._id} asChild className="px-3 py-2 cursor-pointer text-base font-semibold">
                                                <Link to={`${category.categorySlug}/blogs`} className="p-4 border-opacity-50 border-gray-500">
                                                    {capitalizeWords(category.categoryName)}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                        <DropdownMenuItem key={"view-all-categories"} asChild className="px-3 py-2 cursor-pointer text-base font-semibold">
                                            <Link to={`/categories`} className="p-4 border-opacity-50 border-gray-500">
                                                View All Categories
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                            <li>
                                <NavLink to="/blogs" className="hover:text-blue-violet transition">
                                    Blogs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact-us" className="hover:text-blue-violet transition">
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Login/Register */}
                <div className="flex gap-4 items-center">
                    <NavLink to="/login" className="flex items-center gap-2 text-sm md:text-base lg:text-sm xl:text-lg font-medium group relative">
                        <FaRegUserCircle className="text-blue-violet transition hidden lg:block" size={20} />
                        <span className="relative">
                            <span className="group-hover:text-blue-violet transition">Login / Register</span>
                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-primary transition-transform scale-x-0 group-hover:scale-x-100"></span>
                        </span>
                    </NavLink>
                    <GoSidebarExpand onClick={() => setIsOpenModel(true)} className="lg:hidden" size={23} />
                </div>
            </header>
            <HeaderSidebar isOpenModel={isOpenModel} handleModel={handleModel} categories={categories} />
        </>
    );
};

export default Header;
