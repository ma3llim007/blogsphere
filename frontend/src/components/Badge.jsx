import { twMerge } from "tailwind-merge";

const Badge = ({ title, className = "Primary" }) => {
    const buttonClass = twMerge("inline-block px-2 py-1 text-center text-xs font-black rounded select-none", className);
    return <span className={buttonClass}>{title}</span>;
};

export default Badge;
