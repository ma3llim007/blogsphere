import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import Container from "@/components/common/Container";
import { capitalizeWords } from "@/utils/utils";
import { Link } from "react-router-dom";

const CategorySection = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => crudService.get("/category/categories"),
        onError: error => {
            const message = error?.response?.data?.message || error?.message;
            toastService.error(message || "Failed to fetch Data.");
        },
    });
    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className="my-7 sm:my-9 lg:my-14">
            <Container>
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Discover Our Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {data?.data?.map(category => (
                        <div key={category?._id} className="w-full relative group overflow-hidden rounded-xl shadow-lg">
                            <Link to={`/${category.categorySlug}/blogs`} className="block relative">
                                <img
                                    src={category?.categoryImage}
                                    alt={capitalizeWords(category?.categoryName)}
                                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <h3 className="text-white text-xl sm:text-2xl font-bold text-center">{capitalizeWords(category?.categoryName)}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default CategorySection;
