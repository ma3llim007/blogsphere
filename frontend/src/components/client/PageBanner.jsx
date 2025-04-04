import { capitalizeWords } from "@/utils/utils";
import Container from "../common/Container";

const PageBanner = ({ title, children }) => {
    return (
        <div className="bg-light py-16">
            <Container>
                <div className="flex justify-between items-center">
                    <h2 className="line-clamp-3 break-words text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug border-l-4 sm:text-start pl-4 border-blue-600 rounded-l-lg py-1 max-w-full md:max-w-md lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl">
                        {capitalizeWords(title)}
                    </h2>
                    <div className="justify-center items-center hidden md:flex my-2 text-lg">{children}</div>
                </div>
            </Container>
        </div>
    );
};

export default PageBanner;
