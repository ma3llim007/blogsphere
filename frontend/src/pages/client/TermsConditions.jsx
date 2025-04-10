import PageBanner from "@/components/client/PageBanner";
import Container from "@/components/common/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const TermsConditions = () => {
    const currentUrl = import.meta.env.VITE_BASE_URL;
    return (
        <>
            <Helmet>
                <title>Terms and Conditions | BlogSphere - Understand Our Rules</title>
                <meta name="description" content="Read the Terms and Conditions of BlogSphere to understand the rules and guidelines for using our platform." />
                <meta name="keywords" content="Terms and Conditions, BlogSphere, Platform Rules, User Agreement, Blogging Website Terms" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={currentUrl} />
                {/* Open Graph / Facebook */}
                <meta property="og:title" content="Terms and Conditions | BlogSphere - Understand Our Rules" />
                <meta property="og:description" content="Read the Terms and Conditions of BlogSphere to understand the rules and guidelines for using our platform." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:image" content={`${currentUrl}/logo.svg`} />
                <meta property="og:site_name" content="BlogSphere" />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Terms and Conditions | BlogSphere - Understand Our Rules" />
                <meta name="twitter:description" content="Read the Terms and Conditions of BlogSphere to understand the rules and guidelines for using our platform." />
                <meta name="twitter:image" content={`${currentUrl}/logo.svg`} />
                {/* Optional Enhancements */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </Helmet>
            <PageBanner title="Terms Conditions">
                <Breadcrumb>
                    <BreadcrumbList className="text-lg font-bold">
                        <BreadcrumbItem>
                            <Link className="text-black hover:text-blue-violet" to="/">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-blue-violet">{"Terms Conditions"}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </PageBanner>
            <Container>
                <div className="my-16 space-y-8">
                    {/* Terms */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">1. Terms</h2>
                        <p className="text-gray-700">
                            By accessing this website, you agree to comply with these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are
                            prohibited from using or accessing this site. The materials on this website are protected by applicable copyright and trademark laws.
                        </p>
                    </div>

                    {/* Use License */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">2. Use License</h2>
                        <p className="text-gray-700">
                            You are granted a limited, non-exclusive, and non-transferable license to access and use this website for personal, non-commercial purposes. Under this license, you may
                            not:
                        </p>
                        <ul className="list-disc pl-9 space-y-2 text-gray-700">
                            <li>Modify or copy any materials.</li>
                            <li>Use the content for commercial purposes or public display.</li>
                            <li>Attempt to reverse-engineer any software contained on this website.</li>
                            <li>Transfer the materials to another person or &quot;mirror&quot; them on any other server.</li>
                        </ul>
                        <p className="text-gray-700">This license will automatically terminate if you violate any of these restrictions and may be terminated at any time by the website owner.</p>
                    </div>

                    {/* Disclaimer */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">3. Disclaimer</h2>
                        <p className="text-gray-700">
                            The materials on this website are provided &quot;as is.&quot; BlogSphere makes no warranties, expressed or implied, and hereby disclaims all other warranties, including but
                            not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                        <p className="text-gray-700">
                            Additionally, BlogSphere does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or
                            otherwise relating to such materials.
                        </p>
                    </div>

                    {/* Limitations */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">4. Limitations</h2>
                        <p className="text-gray-700">
                            In no event shall BlogSphere or its affiliates be liable for any damages (including, but not limited to, loss of data, business interruption, or personal injury) arising
                            from the use or inability to use the materials on this website, even if BlogSphere or an authorized representative has been notified orally or in writing of the possibility
                            of such damage.
                        </p>
                    </div>

                    {/* Links to Other Sites */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">5. Links to External Websites</h2>
                        <p className="text-gray-700">
                            This website may include links to third-party websites. These links are provided for convenience only. BlogSphere is not responsible for the content of any linked site and
                            does not endorse or assume any responsibility for any material found on such sites. Users access these websites at their own risk.
                        </p>
                    </div>

                    {/* Modifications to Terms */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">6. Changes to These Terms</h2>
                        <p className="text-gray-700">
                            BlogSphere reserves the right to revise these Terms of Use at any time without prior notice. By using this website, you agree to be bound by the current version of these
                            Terms of Use. We encourage visitors to check this page regularly for updates.
                        </p>
                    </div>

                    {/* Governing Law */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">7. Governing Law</h2>
                        <p className="text-gray-700">
                            Any claims relating to BlogSphere shall be governed by the laws of [Your Country/State], without regard to its conflict of law provisions. Any disputes shall be resolved in
                            the appropriate courts of [Your Country/State].
                        </p>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default TermsConditions;
