import Container from "@/components/common/Container";
import { SlCalender } from "react-icons/sl";

const HomeBanner = () => {
    return (
        <div className="bg-light">
            <Container key={"HomeBanner"}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-0 py-15 sm:px-7 md:px-4">
                    {/* Featured Large Card */}
                    <div className="border-b-4 border-blue-600 rounded-xl overflow-hidden shadow-lg">
                        <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418605/post13_1db38b91e8.jpg" className="w-full h-80 object-cover" alt="Feature Product Images" />
                        <div className="bg-white px-5 py-3 space-y-5 rounded-xl pb-7">
                            <p className="bg-light text-blue-violet max-w-fit text-sm p-1 rounded-2xl lg:text-base font-bold">Smartphones</p>
                            <h1 className="text-xl md:text-2xl font-extrabold">Top 5 best smartphone 2023</h1>
                            <p className="flex gap-3 text-sm items-center text-gray-500">
                                <SlCalender /> May 28th, 2023
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="bg-white flex gap-4 p-2">
                            <div className="flex gap-5 rounded-md">
                                <div className="w-40">
                                    <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703475222/post24_4434974ae8.jpg" alt="Image" className="w-full h-full object-cover rounded-md" />
                                </div>
                            </div>
                            <div className="grow space-y-3 py-4">
                                <p className="bg-light text-blue-violet max-w-fit text-sm px-3 py-1 rounded-2xl lg:text-base font-bold">Smartphones</p>
                                <h1 className="text-sm  md:text-xl font-bold">Top 5 best smartphone 2023</h1>
                                <p className="flex gap-3 items-center text-sm text-gray-500">
                                    <SlCalender /> May 28th, 2023
                                </p>
                            </div>
                        </div>
                        <div className="bg-white flex gap-4 p-2">
                            <div className="flex gap-5 rounded-md">
                                <div className="w-40">
                                    <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703475222/post24_4434974ae8.jpg" alt="Image" className="w-full h-full object-cover rounded-md" />
                                </div>
                            </div>
                            <div className="grow space-y-3 py-4">
                                <p className="bg-light text-blue-violet max-w-fit text-sm px-3 py-1 rounded-2xl lg:text-base font-bold">Smartphones</p>
                                <h1 className="text-sm  md:text-xl font-bold">Top 5 best smartphone 2023</h1>
                                <p className="flex gap-3 items-center text-sm text-gray-500">
                                    <SlCalender /> May 28th, 2023
                                </p>
                            </div>
                        </div>
                        <div className="bg-white flex gap-4 p-2">
                            <div className="flex gap-5 rounded-md">
                                <div className="w-40">
                                    <img src="https://res.cloudinary.com/dkrkceyqn/image/upload/v1703475222/post24_4434974ae8.jpg" alt="Image" className="w-full h-full object-cover rounded-md" />
                                </div>
                            </div>
                            <div className="grow space-y-3 py-4">
                                <p className="bg-light text-blue-violet max-w-fit text-sm px-3 py-1 rounded-2xl lg:text-base font-bold">Smartphones</p>
                                <h1 className="text-sm  md:text-xl font-bold">Top 5 best smartphone 2023</h1>
                                <p className="flex gap-3 items-center text-sm text-gray-500">
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

export default HomeBanner;
