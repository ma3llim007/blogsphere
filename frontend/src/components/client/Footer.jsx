import { FaFacebook, FaInstagram, FaLinkedinIn, FaRegCopyright, FaTwitter } from "react-icons/fa";
import Container from "../common/Container";
import { Link } from "react-router-dom";
import { currentYear } from "@/utils/utils";

const socialLinks = [
    { href: "https://www.facebook.com/Ma3llim007/", icon: <FaFacebook />, label: "Facebook" },
    { href: "https://x.com/ma_3llim_007", icon: <FaTwitter />, label: "Twitter" },
    { href: "https://www.instagram.com/ma_3llim_007/", icon: <FaInstagram />, label: "Instagram" },
    { href: "https://www.linkedin.com/in/mohdsameer-dev/", icon: <FaLinkedinIn />, label: "LinkedIn" },
];

const Footer = () => {
    return (
        <footer className="bg-dark text-white">
            <Container>
                <div className="my-10 flex flex-col justify-center items-center gap-5 md:flex-row md:justify-between">
                    <Link to="/" className="w-16">
                        <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703414042/white_logo_ec9180b142.png" alt="Logo" className="w-full h-auto object-cover" />
                    </Link>
                    <div className="flex gap-5 items-center">
                        <h3 className="text-xl lg:text-2xl items-center font-bold">Follow Us</h3>
                        <ul className="flex flex-wrap gap-2 items-center">
                            {socialLinks.map(({ href, icon, label }) => (
                                <li key={label} className="bg-gray-700 p-2 rounded hover:bg-blue-violet transition-transform duration-300 cursor-pointer">
                                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit my ${label}`} className="flex items-center justify-center text-white text-xl">
                                        {icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
            <div className="bg-darker">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between py-7 items-center text-center md:text-left">
                        <p className="flex items-center gap-1 text-sm sm:text-base">
                            <FaRegCopyright /> {currentYear()} <span>Mohd Sameer</span> | Designed & Inspired by <span className="font-bold">Tozi.</span>
                        </p>
                        <div className="flex gap-2 items-center">
                            <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms">Terms & Conditions</Link>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
