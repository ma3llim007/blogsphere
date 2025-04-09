import Container from "@/components/common/Container";
import { capitalizeWords, formatDateTime } from "@/utils/utils";
import { useId } from "react";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const BlogListing = ({ title = "latest blogs", bgColor = "bg-white", blogs = [] }) => {
    const id = useId();
    return (
        <div className={`py-14 ${bgColor}`} key={id}>
            <Container>
                <div className="space-y-7 px-0">
                    <h2 className="text-center sm:border-l-4 sm:text-start sm:pl-4 border-blue-600 rounded-l-lg text-3xl font-extrabold py-1">{capitalizeWords(title)}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {blogs?.map(blog => (
                            <Link
                                to={`/blog-details/${blog?.blogSlug}`}
                                key={blog?._id}
                                className="bg-gray-50 flex flex-col rounded-2xl shadow-lg overflow-hidden cursor-pointer border-b-2 border-transparent hover:border-blue-violet transition-all duration-300"
                            >
                                <img width={475} height={270} src={blog?.blogFeatureImage} alt={capitalizeWords(blog?.blogTitle)} className="w-full h-56 md:h-40 lg:h-64 xl:h-60 object-cover" />
                                <div className="flex flex-col justify-center p-4 space-y-2 md:space-y-3 grow">
                                    <p className="bg-light text-blue-violet px-3 py-1 text-xs md:text-sm lg:text-base font-semibold rounded-2xl max-w-fit">
                                        {capitalizeWords(blog?.blogCategory?.categoryName)}
                                    </p>
                                    <h3 className="text-lg md:text-xl font-bold leading-tight">{capitalizeWords(blog?.blogTitle)}</h3>
                                    <p className="line-clamp-2 text-gray-700">{blog?.blogShortDescription}</p>
                                    <p className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                        <SlCalender /> {formatDateTime(blog?.updatedAt)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default BlogListing;
