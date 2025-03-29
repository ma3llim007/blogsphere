import { Link, NavLink } from "react-router-dom";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
    return (
        <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md transition-all duration-300">
            <div className="container mx-auto flex items-center justify-between py-4 gap-8">
                {/* Logo */}
                <Link to="/" className="w-16 flex-shrink-0">
                    <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703414030/black_logo_04ad91cfe6.png" alt="Logo" className="w-full h-auto object-cover" />
                </Link>

                {/* Navigation & Search */}
                <div className="flex-grow flex items-center justify-between">
                    {/* Search Input */}
                    <div className="relative flex items-center w-64">
                        <FaSearch className="absolute left-3 text-primary" />
                        <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:border-primary outline-none transition duration-300" />
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex gap-6 font-medium text-lg grow justify-center">
                        <NavLink to="/" className="hover:text-primary transition">
                            Home
                        </NavLink>
                        <NavLink to="/about-us" className="hover:text-primary transition">
                            About Us
                        </NavLink>

                        {/* Category Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-1 hover:text-primary transition">
                                    Categories <IoIosArrowDown />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" sideOffset={10} className="bg-white shadow-md rounded-md">
                                <DropdownMenuItem asChild>
                                    <Link to="/category/blogs" className="px-4 py-2 hover:bg-gray-100 block">
                                        Category Name
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <NavLink to="/blogs" className="hover:text-primary transition">
                            Blogs
                        </NavLink>
                        <NavLink to="/contact-us" className="hover:text-primary transition">
                            Contact
                        </NavLink>
                    </nav>
                </div>

                {/* Login/Register */}
                <NavLink to="/login" className="flex items-center gap-2 text-lg font-medium group relative">
                    <FaRegUserCircle className="text-primary transition" size={20} />
                    <span className="relative">
                        <span className="group-hover:text-primary transition">Login / Register</span>
                        <span className="absolute left-0 bottom-0 h-[2px] w-full bg-primary transition-transform scale-x-0 group-hover:scale-x-100"></span>
                    </span>
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
