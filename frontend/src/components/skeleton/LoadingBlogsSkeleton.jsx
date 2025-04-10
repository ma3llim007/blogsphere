import Container from "../common/Container";

const LoadingBlogsSkeleton = () => {
    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-7 lg:my-14">
                <div className="relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group animate-pulse">
                    <div className="relative group overflow-hidden rounded-lg">
                        <div className="w-full h-60 bg-gray-200"></div>
                        <div className="absolute inset-0 bg-gray-400 opacity-40"></div>
                        <span className="absolute bottom-3 left-3 bg-gray-200 text-blue-violet text-sm px-4 py-1 font-bold rounded-full z-10"></span>
                    </div>
                    <div className="px-3 py-5 space-y-3 relative z-10">
                        <div className="text-lg font-bold text-gray-900 h-6 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded mb-1"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <div className="h-5 bg-gray-200 rounded w-5"></div>
                        </div>
                    </div>
                </div>
                <div className="relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group animate-pulse">
                    <div className="relative group overflow-hidden rounded-lg">
                        <div className="w-full h-60 bg-gray-200"></div>
                        <div className="absolute inset-0 bg-gray-400 opacity-40"></div>
                        <span className="absolute bottom-3 left-3 bg-gray-200 text-blue-violet text-sm px-4 py-1 font-bold rounded-full z-10"></span>
                    </div>
                    <div className="px-3 py-5 space-y-3 relative z-10">
                        <div className="text-lg font-bold text-gray-900 h-6 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded mb-1"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <div className="h-5 bg-gray-200 rounded w-5"></div>
                        </div>
                    </div>
                </div>
                <div className="relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group animate-pulse">
                    <div className="relative group overflow-hidden rounded-lg">
                        <div className="w-full h-60 bg-gray-200"></div>
                        <div className="absolute inset-0 bg-gray-400 opacity-40"></div>
                        <span className="absolute bottom-3 left-3 bg-gray-200 text-blue-violet text-sm px-4 py-1 font-bold rounded-full z-10"></span>
                    </div>
                    <div className="px-3 py-5 space-y-3 relative z-10">
                        <div className="text-lg font-bold text-gray-900 h-6 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded mb-1"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <div className="h-5 bg-gray-200 rounded w-5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default LoadingBlogsSkeleton;
