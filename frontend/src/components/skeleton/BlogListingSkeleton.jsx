import Container from "../common/Container";

const BlogListingSkeleton = () => {
    return (
        <div className="py-14 bg-light animate-pulse">
            <Container>
                <div className="space-y-7">
                    <div className="h-10 bg-gray-300 rounded"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-gray-400 transition-all duration-300">
                            <div className="h-56 w-full bg-gray-300 md:h-40 lg:h-64 xl:h-60"></div>
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3">
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-10 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-gray-400 transition-all duration-300">
                            <div className="h-56 w-full bg-gray-300 md:h-40 lg:h-64 xl:h-60"></div>
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3">
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-10 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-gray-400 transition-all duration-300">
                            <div className="h-56 w-full bg-gray-300 md:h-40 lg:h-64 xl:h-60"></div>
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3">
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-10 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-gray-400 transition-all duration-300">
                            <div className="h-56 w-full bg-gray-300 md:h-40 lg:h-64 xl:h-60"></div>
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3">
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-10 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-gray-400 transition-all duration-300">
                            <div className="h-56 w-full bg-gray-300 md:h-40 lg:h-64 xl:h-60"></div>
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3">
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-10 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-gray-400 transition-all duration-300">
                            <div className="h-56 w-full bg-gray-300 md:h-40 lg:h-64 xl:h-60"></div>
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3">
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-10 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default BlogListingSkeleton;
