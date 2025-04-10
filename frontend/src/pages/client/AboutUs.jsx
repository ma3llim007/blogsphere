import { Link } from "react-router-dom";
import PageBanner from "@/components/client/PageBanner";
import Container from "@/components/common/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import aboutUsImage from "@/assets/client/about.webp";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
    const currentUrl = import.meta.env.VITE_BASE_URL;
    return (
        <>
            <Helmet>
                <title>About Us | BlogSphere - Learn More About Our Blogging Platform</title>
                <meta name="description" content="Discover the story behind BlogSphere, a leading platform for bloggers to share insights and build communities around their passions." />
                <meta name="keywords" content="BlogSphere, about us, blogging platform, blogging community, blogging website, about BlogSphere" />
                <meta name="author" content="BlogSphere Team" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`${currentUrl}about-us`} />
                {/* Open Graph / Facebook */}
                <meta property="og:title" content="About Us | BlogSphere - Learn More About Our Blogging Platform" />
                <meta property="og:description" content="Learn more about BlogSphere, the platform where bloggers can share their stories, connect with their readers, and make an impact." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${currentUrl}about-us`} />
                <meta property="og:image" content={`${currentUrl}logo.svg`}  />
                <meta property="og:site_name" content="BlogSphere" />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Us | BlogSphere - Learn More About Our Blogging Platform" />
                <meta name="twitter:description" content="Find out the story behind BlogSphere, the go-to platform for aspiring bloggers and influencer to create impactful content." />
                <meta name="twitter:image" content={`${currentUrl}logo.svg`}  />
                {/* Optional Enhancements */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </Helmet>
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
                                About <span className="text-blue-violet">BlogSphere</span>
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                BlogSphere is your go-to platform for insightful articles, engaging content, and the latest trends in various industries. Our mission is to provide high-quality,
                                well-researched, and value-packed content to our readers.
                            </p>
                        </div>
                        {/* About Our Team */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Meet Our <span className="text-blue-violet">Team</span>
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
