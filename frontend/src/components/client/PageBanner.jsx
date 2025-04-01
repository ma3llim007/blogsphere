import { capitalizeWords } from "@/utils/utils";
import Container from "../common/Container";

const PageBanner = ({ title, children }) => {
    return (
        <div className="bg-light py-16">
            <Container>
                <div className="flex justify-between items-center">
                    <h2 className="text-center border-l-4 sm:text-start pl-4 border-blue-600 rounded-l-lg text-3xl font-extrabold py-1">{capitalizeWords(title)}</h2>
                    <div className="justify-center items-center hidden md:flex my-2 text-lg">{children}</div>
                </div>
            </Container>
        </div>
    );
};

export default PageBanner;
