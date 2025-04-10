import Container from "../common/Container";

const CategorySectionSkeleton = () => {
    return (
        <div className="my-7 sm:my-9 lg:my-14 animate-pulse">
            <Container>
                <div className="text-3xl sm:text-4xl font-bold text-center mb-10">
                    <span className="h-10 bg-gray-200 block"></span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6">
                    <div className="w-full relative group overflow-hidden rounded-xl shadow-lg">
                        <div className="block relative">
                            <div className="w-full h-52 bg-gray-500"></div>
                        </div>
                    </div>
                    <div className="w-full relative group overflow-hidden rounded-xl shadow-lg">
                        <div className="block relative">
                            <div className="w-full h-52 bg-gray-500"></div>
                        </div>
                    </div>
                    <div className="w-full relative group overflow-hidden rounded-xl shadow-lg">
                        <div className="block relative">
                            <div className="w-full h-52 bg-gray-500"></div>
                        </div>
                    </div>
                    <div className="w-full relative group overflow-hidden rounded-xl shadow-lg">
                        <div className="block relative">
                            <div className="w-full h-52 bg-gray-500"></div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CategorySectionSkeleton;
