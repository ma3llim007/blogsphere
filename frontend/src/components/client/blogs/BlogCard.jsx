import { FaCalendar } from "react-icons/fa";

const BlogCard = ({ blog }) => {
    return (
        <div className="relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
            <div className="relative group overflow-hidden rounded-lg">
                <img src={blog?.blogImage} alt={blog?.title} className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105" />
                {/* White Overlay On Hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <span className="absolute bottom-3 left-3 bg-white text-blue-violet text-sm px-4 py-1 font-bold rounded-full z-10 transition-colors duration-300 group-hover:bg-blue-violet group-hover:text-white">
                    {blog.category}
                </span>
            </div>
            <div className="px-3 py-5 space-y-2 relative z-10">
                <h3 className="text-lg font-bold text-gray-900 hover:text-blue-violet transition duration-300 line-clamp-2">{blog?.title}</h3>
                <p className="line-clamp-2 text-gray-600">{blog?.shortDescription}</p>
                <p className="flex items-center gap-2 text-gray-500">
                    <FaCalendar /> {blog?.date}
                </p>
            </div>
        </div>
    );
};

export default BlogCard;
