const Loader = ({ width = 40, height = 40, text = "Loading..." }) => {
    return (
        <div className="flex gap-5 items-center justify-center">
            <div style={{ width: `${width}px`, height: `${height}px` }} className="border-4 border-solid border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            <p className="text-base">{text}</p>
        </div>
    );
};

export default Loader;
