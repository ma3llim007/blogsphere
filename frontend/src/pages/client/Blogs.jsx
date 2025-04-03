import { Link } from "react-router-dom";
import PageBanner from "@/components/client/PageBanner";
import Container from "@/components/common/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import BlogCard from "@/components/client/blogs/BlogCard";

const blogsContent = [
    {
        _id: 1,
        category: "Category",
        blogImage: "https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418605/post13_1db38b91e8.jpg",
        title: "Top 5 Best SmartPhone 2023",
        shortDescription:"What you eat directly impacts brain function, focus, and overall mental clarity. Learn how proper nutrition enhances cognitive performance, reduces brain fog, and improves mood, along with the best foods for optimal brain health.",
        date: "May 28th, 2023",
    },
    {
        _id: 2,
        category: "Category",
        blogImage: "https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418605/post13_1db38b91e8.jpg",
        title: "Top 5 Best SmartPhone 2023",
        shortDescription:"What you eat directly impacts brain function, focus, and overall mental clarity. Learn how proper nutrition enhances cognitive performance, reduces brain fog, and improves mood, along with the best foods for optimal brain health.",
        date: "May 28th, 2023",
    },
    {
        _id: 3,
        category: "Category",
        blogImage: "https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418605/post13_1db38b91e8.jpg",
        title: "Top 5 Best SmartPhone 2023",
        shortDescription:"What you eat directly impacts brain function, focus, and overall mental clarity. Learn how proper nutrition enhances cognitive performance, reduces brain fog, and improves mood, along with the best foods for optimal brain health.",
        date: "May 28th, 2023",
    },
    {
        _id: 4,
        category: "Category",
        blogImage: "https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418605/post13_1db38b91e8.jpg",
        title: "Top 5 Best SmartPhone 2023",
        shortDescription:"What you eat directly impacts brain function, focus, and overall mental clarity. Learn how proper nutrition enhances cognitive performance, reduces brain fog, and improves mood, along with the best foods for optimal brain health.",
        date: "May 28th, 2023",
    },
    {
        _id: 5,
        category: "Category",
        blogImage: "https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418605/post13_1db38b91e8.jpg",
        title: "Top 5 Best SmartPhone 2023",
        shortDescription:"What you eat directly impacts brain function, focus, and overall mental clarity. Learn how proper nutrition enhances cognitive performance, reduces brain fog, and improves mood, along with the best foods for optimal brain health.",
        date: "May 28th, 2023",
    },
    {
        _id: 6,
        category: "Category",
        blogImage: "https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418605/post13_1db38b91e8.jpg",
        title: "Top 5 Best SmartPhone 2023",
        shortDescription:"What you eat directly impacts brain function, focus, and overall mental clarity. Learn how proper nutrition enhances cognitive performance, reduces brain fog, and improves mood, along with the best foods for optimal brain health.",
        date: "May 28th, 2023",
    },
    {
        _id: 7,
        category: "Category",
        blogImage: "https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418605/post13_1db38b91e8.jpg",
        title: "Top 5 Best SmartPhone 2023",
        shortDescription:"What you eat directly impacts brain function, focus, and overall mental clarity. Learn how proper nutrition enhances cognitive performance, reduces brain fog, and improves mood, along with the best foods for optimal brain health.",
        date: "May 28th, 2023",
    },
    {
        _id: 8,
        category: "Category",
        blogImage: "https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418605/post13_1db38b91e8.jpg",
        title: "Top 5 Best SmartPhone 2023",
        shortDescription:"What you eat directly impacts brain function, focus, and overall mental clarity. Learn how proper nutrition enhances cognitive performance, reduces brain fog, and improves mood, along with the best foods for optimal brain health.",
        date: "May 28th, 2023",
    },
    {
        _id: 9,
        category: "Category",
        blogImage: "https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418605/post13_1db38b91e8.jpg",
        title: "Top 5 Best SmartPhone 2023",
        shortDescription:"What you eat directly impacts brain function, focus, and overall mental clarity. Learn how proper nutrition enhances cognitive performance, reduces brain fog, and improves mood, along with the best foods for optimal brain health.",
        date: "May 28th, 2023",
    },
    {
        _id: 10,
        category: "Category",
        blogImage: "https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418605/post13_1db38b91e8.jpg",
        title: "Top 5 Best SmartPhone 2023",
        shortDescription:"What you eat directly impacts brain function, focus, and overall mental clarity. Learn how proper nutrition enhances cognitive performance, reduces brain fog, and improves mood, along with the best foods for optimal brain health.",
        date: "May 28th, 2023",
    },
    {
        _id: 11,
        category: "Category",
        blogImage: "https://res.cloudinary.com/dkrkceyqn/image/upload/v1703418605/post13_1db38b91e8.jpg",
        title: "Top 5 Best SmartPhone 2023",
        shortDescription:"What you eat directly impacts brain function, focus, and overall mental clarity. Learn how proper nutrition enhances cognitive performance, reduces brain fog, and improves mood, along with the best foods for optimal brain health.",
        date: "May 28th, 2023",
    },
];

const Blogs = () => {
    return (
        <>
            <PageBanner title="Blogs">
                <Breadcrumb>
                    <BreadcrumbList className="text-lg font-bold">
                        <BreadcrumbItem>
                            <Link className="text-black hover:text-blue-violet" to="/">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-blue-violet">{"Blogs"}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </PageBanner>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-7 lg:my-14">
                    {blogsContent?.map(blog => (
                        <BlogCard blog={blog} key={blog?._id} />
                    ))}
                </div>
            </Container>
        </>
    );
};

export default Blogs;
