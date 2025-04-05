import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

const ScrollProgressBar = () => {
    const [progress, setProgress] = useState(0);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = Math.ceil((scrollTop / docHeight) * 100);
        setProgress(scrolled);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className="fixed top-0 left-0 w-full z-[9999]">
            <Progress value={progress} className="h-1.5 bg-transparent [&>div]:bg-blue-violet transition-all duration-300 rounded-none" />
        </div>
    );
};

export default ScrollProgressBar;
