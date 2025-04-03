import { Link } from "react-router-dom";
import PageBanner from "@/components/client/PageBanner";
import Container from "@/components/common/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import aboutUsImage from "@/assets/client/about.webp";

const AboutUs = () => {
    return (
        <>
            <PageBanner title="About Us">
                <Breadcrumb>
                    <BreadcrumbList className="text-lg font-bold">
                        <BreadcrumbItem>
                            <Link className="text-black hover:text-blue-violet" to="/">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-blue-violet">{"About Us"}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </PageBanner>
            <Container>
                <div className="py-12">
                    {/* Image Section */}
                    <div className="flex justify-center mb-12">
                        <img className="w-full max-w-4xl object-cover rounded-xl shadow-lg" src={aboutUsImage} alt="About Us" />
                    </div>
                    {/* Content Section */}
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* About BlogSphere */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-gray-900">
                                About <span className="text-blue-600">BlogSphere</span>
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                BlogSphere is your go-to platform for insightful articles, engaging content, and the latest trends in various industries. Our mission is to provide high-quality,
                                well-researched, and value-packed content to our readers.
                            </p>
                        </div>
                        {/* About Our Team */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Meet Our <span className="text-blue-600">Team</span>
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Our dedicated team of writers, researchers, and industry experts work tirelessly to bring you the best content. We believe in the power of knowledge and storytelling to
                                inspire, educate, and entertain.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default AboutUs;
