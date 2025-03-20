const Loading = ({ width = 14, height = 14 }) => {
    return (
        <div className="w-screen h-screen bg-black/50 !overflow-hidden pointer-events-none z-50 transition-all duration-100 ease-in-out flex items-center justify-center">
            <div className={`w-${width} h-${height} border-6 border-solid border-blue-600 rounded-full border-t-transparent animate-spin`}></div>
        </div>
    );
};

export default Loading;
