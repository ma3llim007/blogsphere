import Container from "../common/Container";

const HomeBannerSkeleton = () => {
    return (
        <div className="bg-light py-10">
            <Container>
                <div className="bg-gray-200 py-10 px-4 animate-pulse">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="border-b-4 border-gray-400 rounded-xl overflow-hidden">
                                <div className="bg-gray-300 w-full h-80"></div>
                                <div className="bg-gray-200 px-5 py-4 space-y-3">
                                    <div className="bg-gray-300 text-sm px-3 py-1 rounded-2xl block w-4/6 h-4"></div>
                                    <div className="bg-gray-300 h-4"></div>
                                    <div className="flex gap-2 h-4 bg-gray-300 w-3/6"></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="bg-gray-200 rounded-xl flex gap-4 p-3">
                                    <div className="w-36 sm:w-40 bg-gray-300"></div>
                                    <div className="grow space-y-2">
                                        <div className="bg-gray-300 text-sm px-3 py-1 rounded-2xl block w-4/6 h-4"></div>
                                        <div className="bg-gray-300 h-4"></div>
                                        <div className="flex gap-2 h-4 bg-gray-300 w-3/6"></div>
                                    </div>
                                </div>
                                <div className="bg-gray-200 rounded-xl flex gap-4 p-3">
                                    <div className="w-36 sm:w-40 bg-gray-300"></div>
                                    <div className="grow space-y-2">
                                        <div className="bg-gray-300 text-sm px-3 py-1 rounded-2xl block w-4/6 h-4"></div>
                                        <div className="bg-gray-300 h-4"></div>
                                        <div className="flex gap-2 h-4 bg-gray-300 w-3/6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HomeBannerSkeleton;
