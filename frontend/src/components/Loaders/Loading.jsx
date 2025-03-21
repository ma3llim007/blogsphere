const Loading = ({ width = 50, height = 50 }) => {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 bottom-0 pointer-events-none z-50 flex items-center justify-center bg-black/70  backdrop-blur-md transition-all duration-100 ease-in-out ">
            <div style={{ width: `${width}px`, height: `${height}px` }} className="border-6 border-solid border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
    );
};

export default Loading;
