import Container from "@/components/common/Container";
import { capitalizeWords, formatDateTime } from "@/utils/utils";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const HomeBanner = ({ blogs }) => {
    if (!blogs?.length) return null;

    const featuredBlog = blogs[0];
    const secondaryBlogs = blogs.slice(1, 4);
    return (
        <div className="bg-light py-10">
            <Container key={"HomeBanner"}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Featured Large Blog Card */}
                    <Link to={`/blog-details/${featuredBlog?.blogSlug}`} className="border-b-4 border-blue-600 rounded-xl overflow-hidden shadow-md group transition-transform hover:scale-[1.01]">
                        <img width={"100%"} height={"100%"} loading="lazy" src={featuredBlog?.blogFeatureImage} alt={featuredBlog?.blogTitle} className="w-full h-80 object-cover" />
                        <div className="bg-white px-5 py-4 space-y-3">
                            <span className="bg-light text-blue-violet text-sm px-3 py-1 rounded-2xl font-bold inline-block">{capitalizeWords(featuredBlog?.category)}</span>
                            <h2 className="text-xl md:text-2xl font-extrabold leading-tight line-clamp-2">{capitalizeWords(featuredBlog?.blogTitle)}</h2>
                            <p className="flex items-center gap-2 text-sm text-gray-500">
                                <SlCalender /> {formatDateTime(featuredBlog?.updatedAt)}
                            </p>
                        </div>
                    </Link>
                    {/* Secondary Blogs */}
                    <div className="flex flex-col gap-4">
                        {secondaryBlogs?.map(blog => (
                            <Link to={`/blog-details/${blog?.blogSlug}`} key={blog?._id} className="bg-white rounded-xl shadow-sm flex gap-4 p-3 hover:shadow-md transition-shadow group">
                                <div className="w-36 sm:w-40 flex-shrink-0">
                                    <img width={"100%"} height={"100%"} loading="lazy" src={blog?.blogFeatureImage} alt={blog?.blogTitle} className="w-full h-full object-cover rounded-md" />
                                </div>
                                <div className="grow space-y-2">
                                    <span className="bg-light text-blue-violet text-sm px-3 py-1 rounded-2xl font-semibold inline-block">{capitalizeWords(blog?.category)}</span>
                                    <h3 className="text-sm md:text-lg font-semibold line-clamp-2 group-hover:text-blue-violet transition-colors">{capitalizeWords(blog?.blogTitle)}</h3>
                                    <p className="flex items-center gap-2 text-sm text-gray-500">
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

export default HomeBanner;
