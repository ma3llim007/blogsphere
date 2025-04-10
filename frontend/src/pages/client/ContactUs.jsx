import { Link } from "react-router-dom";
import PageBanner from "@/components/client/PageBanner";
import Container from "@/components/common/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ContactUsImage from "../../assets/client/contact-us.webp";
import { Button } from "@/components/ui/button";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { enquirySchema } from "@/validation/clientSchema";
import { useMutation } from "@tanstack/react-query";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import Loading from "@/components/common/Loading";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
    const currentUrl = import.meta.env.VITE_BASE_URL;
    const {
        register,
        formState: { errors },
        setError,
        handleSubmit,
        reset,
    } = useForm({ mode: "onChange", resolver: yupResolver(enquirySchema) });

    const { mutate, isPending } = useMutation({
        mutationFn: data => crudService.post("enquiry/save", data),
        onSuccess: data => {
            toastService.success(data?.message);
            reset();
        },
        onError: error => {
            const message = error?.response?.data?.message || error?.message;
            setError("root", { message });
        },
    });

    if (isPending) {
        return <Loading />;
    }
    return (
        <>
            <Helmet>
                <title>Contact Us | BlogSphere - Get in Touch with Us</title>
                <meta name="description" content="Reach out to BlogSphere for any inquiries, support, or feedback. We're here to help you!" />
                <meta name="keywords" content="Contact BlogSphere, Contact Us, BlogSphere support, Get in touch, Contact BlogSphere team" />
                <meta name="author" content="BlogSphere Team" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`${currentUrl}contact-us`} />
                {/* Open Graph / Facebook */}
                <meta property="og:title" content="Contact Us | BlogSphere - Get in Touch with Us" />
                <meta property="og:description" content="Reach out to BlogSphere for any inquiries, support, or feedback. We're here to help you!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${currentUrl}contact-us`} />
                <meta property="og:image" content={`${currentUrl}logo.svg`} />
                <meta property="og:site_name" content="BlogSphere" />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us | BlogSphere - Get in Touch with Us" />
                <meta name="twitter:description" content="Reach out to BlogSphere for any inquiries, support, or feedback. We're here to help you!" />
                <meta name="twitter:image" content={`${currentUrl}logo.svg`} />
                {/* Optional Enhancements */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </Helmet>
            <PageBanner title="Contact Us">
                <Breadcrumb>
                    <BreadcrumbList className="text-lg font-bold">
                        <BreadcrumbItem>
                            <Link className="text-black hover:text-blue-violet" to="/">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-blue-violet">{"Contact Us"}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </PageBanner>
            <Container>
                <div className="my-7 lg:my-14 lg:mx-20 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 items-center">
                    <img src={ContactUsImage} className="w-full object-cover" alt="Contact Us" />
                    <div className="bg-white">
                        {errors.root && (
                            <div className="w-full my-4 bg-red-500 text-center rounded-md border border-red-600 py-3 px-4">
                                <h4 className="text-white font-bold text-sm">{errors.root.message}</h4>
                            </div>
                        )}
                        <form onSubmit={handleSubmit(mutate)} className="space-y-4">
                            <Input
                                className="w-full !bg-light !border-none px-4 py-3 !rounded text-base focus:outline-none"
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                {...register("name")}
                                error={errors?.name?.message}
                            />
                            <Input
                                className="w-full !bg-light !border-none px-4 py-3 !rounded text-base focus:outline-none"
                                type="text"
                                name="email"
                                placeholder="Your Email Address"
                                {...register("email")}
                                error={errors?.email?.message}
                            />
                            <Input
                                className="w-full !bg-light !border-none px-4 py-3 !rounded text-base focus:outline-none"
                                type="text"
                                name="phoneNumber"
                                placeholder="Your Phone Number"
                                {...register("phoneNumber")}
                                error={errors?.phoneNumber?.message}
                            />
                            <Input
                                className="w-full !bg-light !border-none px-4 py-3 !rounded text-base focus:outline-none"
                                type="text"
                                name="subject"
                                placeholder="Your Subject"
                                {...register("subject")}
                                error={errors?.subject?.message}
                            />
                            <TextArea
                                className="w-full !bg-light !border-none px-4 py-3 !rounded text-base focus:outline-none resize-none"
                                rows={5}
                                name="message"
                                id="message"
                                placeholder="Write Your Message..."
                                {...register("message")}
                                error={errors?.message?.message}
                            />
                            <Button className="cursor-pointer bg-blue-violet text-base px-6 py-5">Send Message</Button>
                        </form>
                    </div>
                </div>
            </Container>
            <div className="bg-light py-20">
                <Container>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center bg-white border shadow-lg rounded-lg p-5 w-full max-w-md transition-transform duration-300 hover:scale-105">
                            <div className="p-4 bg-gray-100 inline-flex justify-center items-center rounded-full hover:bg-blue-violet hover:text-white group transition-all duration-300 ease-in-out">
                                <FaMapMarkerAlt className="text-3xl text-blue-violet group-hover:text-white transition-all duration-300 ease-in-out" />
                            </div>
                            <div className="ml-4 space-y-2">
                                <h2 className="text-xl font-bold">Contact</h2>
                                <p className="text-base text-gray-600">Shaheen Nagar, Hyderabad, Telanagana</p>
                            </div>
                        </div>
                        <div className="flex items-center bg-white border shadow-lg rounded-lg p-5 w-full max-w-md transition-transform duration-300 hover:scale-105">
                            <div className="p-4 bg-gray-100 inline-flex justify-center items-center rounded-full hover:bg-blue-violet hover:text-white group transition-all duration-300 ease-in-out">
                                <FaPhoneAlt className="text-3xl text-blue-violet group-hover:text-white transition-all duration-300 ease-in-out" />
                            </div>
                            <div className="ml-4 space-y-2">
                                <h2 className="text-xl font-bold">Our Address</h2>
                                <p className="text-base text-gray-600">
                                    Mobile: <span className="text-black">(+44) - 45789 - 5789</span>
                                </p>
                                <p className="text-base text-gray-600">
                                    E-mail:{" "}
                                    <a href="mailto:mohdsameer68257@gmail.com" className="text-black">
                                        mohdsameer68257@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center bg-white border shadow-lg rounded-lg p-5 w-full max-w-md transition-transform duration-300 hover:scale-105">
                            <div className="p-4 bg-gray-100 inline-flex justify-center items-center rounded-full hover:bg-blue-violet hover:text-white group transition-all duration-300 ease-in-out">
                                <FaClock className="text-3xl text-blue-violet group-hover:text-white transition-all duration-300 ease-in-out" />
                            </div>
                            <div className="ml-4 space-y-2">
                                <h2 className="text-xl font-bold">Hours of Operation</h2>
                                <p className="text-base text-gray-600">Monday - Friday: 09:00 - 20:00</p>
                                <p className="text-base text-gray-600">Sunday & Saturday: 10:30 - 22:00</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default ContactUs;
