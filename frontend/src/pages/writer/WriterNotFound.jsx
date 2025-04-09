import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const WriterNotFound = () => {
    return (
        <>
            <Helmet>
                <title>404 - Page Not Found | Writer Panel | BlogSphere</title>
                <meta name="description" content="The page you're looking for isn't available in the Writer Panel. Please check the link or return to the dashboard." />
                <meta name="keywords" content="404 Page, Page Not Found, Writer Panel Error, Broken Link, BlogSphere Writer" />
                <meta name="robots" content="noindex, nofollow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>
            <section className="w-full h-full bg-white dark:bg-slate-950 flex flex-col justify-center items-center leading-10 py-20 px-5 text-center">
                <h1 className="font-extrabold text-9xl mb-1">404</h1>
                <h2 className="font-bold text-xl mb-3 lg:text-4xl xl:text-4xl 2xl:text-4xl">The Page You&apos;re Looking For Can&apos;t Found!</h2>
                <p className="leading-7 text-base font-medium mb-4">You didn&apos;t break the internet, but we can&apos;t find what you are looking for.</p>
                <Link to={"/writer/dashboard"}>
                    <Button className="Primary btn2xl cursor-pointer">Back To Dashboard</Button>
                </Link>
            </section>
        </>
    );
};

export default WriterNotFound;
