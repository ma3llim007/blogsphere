import { Link, NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { capitalizeWords } from "@/utils/utils";

const HeaderSidebar = ({ isOpenModel, handleModel, categories }) => {
    return (
        <div
            className={`fixed inset-0 w-full h-full bg-white transition-transform duration-300 ease-in-out transform ${isOpenModel ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} z-40 overflow-y-scroll lg:hidden xl:hidden 2xl:hidden`}
        >
            <div className="w-full">
                {/* Close Button */}
                <div className="px-4 sm:px-10 lg:px-12">
                    <div className="flex py-2 justify-end items-center">
                        <IoCloseSharp onClick={handleModel} className="font-bold cursor-pointer text-2xl" />
                    </div>
                </div>

                <hr className="my-2" />

                {/* Navigation */}
                <nav className="w-full px-3 mt-5 mb-5">
                    <ul className="flex flex-col items-start gap-5 p-2 text-xl font-semibold">
                        <li className="w-full">
                            <NavLink onClick={handleModel} to={"/"}>
                                Home
                            </NavLink>
                        </li>
                        <li className="w-full">
                            <NavLink onClick={handleModel} to={"/about-us"}>
                                About Us
                            </NavLink>
                        </li>
                        <li className="w-full">
                            <nav className="group rounded-md" key="categories">
                                <input type="checkbox" id="toggle-categories" className="hidden peer" />
                                <label htmlFor="toggle-categories" className="flex justify-between items-center py-2 cursor-pointer rounded-md">
                                    <Link onClick={handleModel} to="/categories">
                                        Category
                                    </Link>
                                    <div className="px-1 py-1 text-base">
                                        <MdKeyboardArrowDown size={25} className="transform peer-checked:rotate-180 transition-transform duration-300" />
                                    </div>
                                </label>
                                <ul className="ml-4 mt-2 space-y-1 hidden peer-checked:block transition-all duration-300 ease-in-out">
                                    {categories.map(category => (
                                        <li key={category?._id} className="py-1">
                                            <Link onClick={handleModel} to={`/${category.categorySlug}/blogs`} className="block px-3 py-1 underline underline-offset-4">
                                                {capitalizeWords(category.categoryName)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </li>
                        <li className="w-full ml-1">
                            <NavLink onClick={handleModel} to={"/blogs"}>
                                Blogs
                            </NavLink>
                        </li>
                        <li className="w-full ml-1">
                            <NavLink onClick={handleModel} to={"/contact-us"}>
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Social Links */}
                <div className="w-full px-5 my-2 mx-auto">
                    <ul className="flex flex-wrap justify-start gap-5 items-center">
                        <li className="bg-light p-2 rounded">
                            <a target="_blank" href="https://www.facebook.com/Ma3llim007/" onClick={handleModel} aria-label="Visit My Facebook">
                                <FaFacebook className="font-bold text-xl" />
                            </a>
                        </li>
                        <li className="bg-light p-2 rounded">
                            <a target="_blank" href="https://x.com/ma_3llim_007" onClick={handleModel} aria-label="Visit My Twitter">
                                <FaTwitter className="font-bold text-xl" />
                            </a>
                        </li>
                        <li className="bg-light p-2 rounded">
                            <a target="_blank" href="https://www.instagram.com/ma_3llim_007/" onClick={handleModel} aria-label="Visit My Instagram">
                                <FaInstagram className="font-bold text-xl" />
                            </a>
                        </li>
                        <li className="bg-light p-2 rounded">
                            <a target="_blank" href="https://www.linkedin.com/in/mohdsameer-dev/" onClick={handleModel} aria-label="Visit My LinkedIn">
                                <FaLinkedinIn className="font-bold text-xl" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HeaderSidebar;
