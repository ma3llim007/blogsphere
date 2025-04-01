import Container from "@/components/common/Container";
import { capitalizeWords } from "@/utils/utils";
import { useId } from "react";
import { SlCalender } from "react-icons/sl";

const BlogListing = ({ title = "latest blogs", bgColor = "bg-white" }) => {
    const id = useId();
    return (
        <div className={`py-14 ${bgColor}`} key={id}>
            <Container>
                <div className="space-y-7 px-0">
                    <h2 className="text-center sm:border-l-4 sm:text-start sm:pl-4 border-blue-600 rounded-l-lg text-3xl font-extrabold py-1">{capitalizeWords(title)}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-b-2 border-transparent hover:border-blue-violet transition-all duration-300">
                            <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418094/post9_461e19ec82.jpg" alt="Image" className="w-full h-56 md:h-40 lg:h-64 xl:h-60 object-cover" />
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3 grow">
                                <p className="bg-light text-blue-violet px-3 py-1 text-xs md:text-sm lg:text-base font-semibold rounded-2xl max-w-fit">Smartphones</p>
                                <h1 className="text-lg md:text-xl font-bold leading-tight">Top 5 Best Smartphones of 2023</h1>
                                <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                    <SlCalender /> May 28th, 2023
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-b-2 border-transparent hover:border-blue-violet transition-all duration-300">
                            <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418094/post9_461e19ec82.jpg" alt="Image" className="w-full h-56 md:h-40 lg:h-64 xl:h-60 object-cover" />
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3 grow">
                                <p className="bg-light text-blue-violet px-3 py-1 text-xs md:text-sm lg:text-base font-semibold rounded-2xl max-w-fit">Smartphones</p>
                                <h1 className="text-lg md:text-xl font-bold leading-tight">Top 5 Best Smartphones of 2023</h1>
                                <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                    <SlCalender /> May 28th, 2023
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-b-2 border-transparent hover:border-blue-violet transition-all duration-300">
                            <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418094/post9_461e19ec82.jpg" alt="Image" className="w-full h-56 md:h-40 lg:h-64 xl:h-60 object-cover" />
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3 grow">
                                <p className="bg-light text-blue-violet px-3 py-1 text-xs md:text-sm lg:text-base font-semibold rounded-2xl max-w-fit">Smartphones</p>
                                <h1 className="text-lg md:text-xl font-bold leading-tight">Top 5 Best Smartphones of 2023</h1>
                                <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                    <SlCalender /> May 28th, 2023
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-b-2 border-transparent hover:border-blue-violet transition-all duration-300">
                            <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418094/post9_461e19ec82.jpg" alt="Image" className="w-full h-56 md:h-40 lg:h-64 xl:h-60 object-cover" />
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3 grow">
                                <p className="bg-light text-blue-violet px-3 py-1 text-xs md:text-sm lg:text-base font-semibold rounded-2xl max-w-fit">Smartphones</p>
                                <h1 className="text-lg md:text-xl font-bold leading-tight">Top 5 Best Smartphones of 2023</h1>
                                <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                    <SlCalender /> May 28th, 2023
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-b-2 border-transparent hover:border-blue-violet transition-all duration-300">
                            <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418094/post9_461e19ec82.jpg" alt="Image" className="w-full h-56 md:h-40 lg:h-64 xl:h-60 object-cover" />
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3 grow">
                                <p className="bg-light text-blue-violet px-3 py-1 text-xs md:text-sm lg:text-base font-semibold rounded-2xl max-w-fit">Smartphones</p>
                                <h1 className="text-lg md:text-xl font-bold leading-tight">Top 5 Best Smartphones of 2023</h1>
                                <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                    <SlCalender /> May 28th, 2023
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-b-2 border-transparent hover:border-blue-violet transition-all duration-300">
                            <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418094/post9_461e19ec82.jpg" alt="Image" className="w-full h-56 md:h-40 lg:h-64 xl:h-60 object-cover" />
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3 grow">
                                <p className="bg-light text-blue-violet px-3 py-1 text-xs md:text-sm lg:text-base font-semibold rounded-2xl max-w-fit">Smartphones</p>
                                <h1 className="text-lg md:text-xl font-bold leading-tight">Top 5 Best Smartphones of 2023</h1>
                                <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                    <SlCalender /> May 28th, 2023
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-b-2 border-transparent hover:border-blue-violet transition-all duration-300">
                            <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418094/post9_461e19ec82.jpg" alt="Image" className="w-full h-56 md:h-40 lg:h-64 xl:h-60 object-cover" />
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3 grow">
                                <p className="bg-light text-blue-violet px-3 py-1 text-xs md:text-sm lg:text-base font-semibold rounded-2xl max-w-fit">Smartphones</p>
                                <h1 className="text-lg md:text-xl font-bold leading-tight">Top 5 Best Smartphones of 2023</h1>
                                <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                    <SlCalender /> May 28th, 2023
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-b-2 border-transparent hover:border-blue-violet transition-all duration-300">
                            <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418094/post9_461e19ec82.jpg" alt="Image" className="w-full h-56 md:h-40 lg:h-64 xl:h-60 object-cover" />
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3 grow">
                                <p className="bg-light text-blue-violet px-3 py-1 text-xs md:text-sm lg:text-base font-semibold rounded-2xl max-w-fit">Smartphones</p>
                                <h1 className="text-lg md:text-xl font-bold leading-tight">Top 5 Best Smartphones of 2023</h1>
                                <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                    <SlCalender /> May 28th, 2023
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-b-2 border-transparent hover:border-blue-violet transition-all duration-300">
                            <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418094/post9_461e19ec82.jpg" alt="Image" className="w-full h-56 md:h-40 lg:h-64 xl:h-60 object-cover" />
                            <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3 grow">
                                <p className="bg-light text-blue-violet px-3 py-1 text-xs md:text-sm lg:text-base font-semibold rounded-2xl max-w-fit">Smartphones</p>
                                <h1 className="text-lg md:text-xl font-bold leading-tight">Top 5 Best Smartphones of 2023</h1>
                                <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                    <SlCalender /> May 28th, 2023
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default BlogListing;
