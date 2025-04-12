import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
    const currentUrl = import.meta.env.VITE_BASE_URL;

    return (
        <>
            <Helmet>
                <title>404 Not Found | BlogSphere</title>
                <meta name="description" content="Oops! The page you're looking for doesn't exist on BlogSphere. Explore our latest articles or head back home." />
                <meta name="keywords" content="404 page, BlogSphere error, page not found, broken link, BlogSphere missing page" />
                <meta name="author" content="BlogSphere Team" />
                <meta name="robots" content="noindex, follow" />
                <link rel="canonical" href={`${currentUrl}404`} />
                {/* Open Graph / Facebook */}
                <meta property="og:title" content="404 Not Found | BlogSphere" />
                <meta property="og:description" content="The page you’re looking for might have been removed or is temporarily unavailable." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${currentUrl}404`} />
                <meta property="og:image" content={`${currentUrl}logo.svg`} />
                <meta property="og:site_name" content="BlogSphere" />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="404 Not Found | BlogSphere" />
                <meta name="twitter:description" content="Oops! This page doesn't exist. Return home or browse other content." />
                <meta name="twitter:image" content={`${currentUrl}logo.svg`} />
                {/* Optional Enhancements */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </Helmet>
            <section className="w-full h-full flex flex-col justify-center items-center leading-10 py-20 px-5 text-center">
                <h1 className="font-extrabold text-9xl mb-1">404</h1>
                <h2 className="font-bold text-xl mb-3 lg:text-4xl xl:text-4xl 2xl:text-4xl">The Page You&apos;re Looking For Can&apos;t Found</h2>
                <p className="leading-7 text-base font-medium mb-4">You didn&apos;t break the internet, but we can&apos;t find what you are looking for.</p>
                <Link to={"/"}>
                    <Button className="Primary btnXl">Back To Home</Button>
                </Link>
            </section>
        </>
    );
};

export default NotFound;
