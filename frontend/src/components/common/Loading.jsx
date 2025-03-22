import { useEffect } from "react";

const Loading = ({ width = 50, height = 50 }) => {
    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        // Prevent Mouse Events
        const previousMouseEvents = e => {
            e.preventDefault();
            e.stopPropagation();
        };

        // Disable Scroll
        document.body.style.overflow = "hidden";

        // Attach Events Listers With AbortController
        window.addEventListener("mousedown", previousMouseEvents, { signal, capture: true });
        window.addEventListener("mouseup", previousMouseEvents, { signal, capture: true });
        window.addEventListener("mousemove", previousMouseEvents, { signal, capture: true });
        window.addEventListener("click", previousMouseEvents, { signal, capture: true });

        return () => {
            document.body.style.overflow = "";
            controller.abort(); // Remove All Event Listeners At Once
        };
    }, []);

    return (
        <div className="w-screen h-screen fixed top-0 left-0 bottom-0 pointer-events-none z-50 flex items-center justify-center bg-black/70  backdrop-blur-md transition-all duration-100 ease-in-out ">
            <div style={{ width: `${width}px`, height: `${height}px` }} className="border-6 border-solid border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
    );
};

export default Loading;
