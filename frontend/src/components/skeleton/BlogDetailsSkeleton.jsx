import Container from "../common/Container";

const BlogDetailsSkeleton = () => {
    return (
        <Container>
            <div className="flex flex-col gap-5 lg:flex-row my-7 lg:my-14 animate-pulse">
                <div className="grow w-full space-y-5">
                    <div className="w-full h-60 bg-gray-400 rounded"></div>
                    <div className="flex flex-col items-center text-gray-700 gap-1 sm:flex-row sm:gap-2 sm:text-start">
                        <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                    </div>
                    <div className="w-full my-4 h-20 bg-gray-400 rounded"></div>
                </div>
                <div className="w-full lg:max-w-sm">
                    <div className="h-6 bg-gray-400 rounded w-1/2"></div>
                    <hr className="border-gray-600" />
                    <div className="flex flex-col gap-4 py-4 items-center justify-center">
                        <div className="flex gap-4 bg-light rounded p-2 w-full">
                            <div className="h-24 w-24 bg-gray-400 rounded"></div>
                            <div className="flex flex-col gap-2">
                                <div className="h-6 bg-gray-400 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-400 rounded w-1/2"></div>
                            </div>
                        </div>
                        <div className="flex gap-4 bg-light rounded p-2 w-full">
                            <div className="h-24 w-24 bg-gray-400 rounded"></div>
                            <div className="flex flex-col gap-2">
                                <div className="h-6 bg-gray-400 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-400 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default BlogDetailsSkeleton;
