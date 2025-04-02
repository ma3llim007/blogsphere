import PageBanner from "@/components/client/PageBanner";
import Container from "@/components/common/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
    return (
        <>
            <PageBanner title="Privacy Policy">
                <Breadcrumb>
                    <BreadcrumbList className="text-lg font-bold">
                        <BreadcrumbItem>
                            <Link className="text-black hover:text-blue-violet" to="/">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-blue-violet">{"Privacy Policy"}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </PageBanner>
            <Container>
                <div className="my-16 space-y-8">
                    {/* Definitions Section */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Definitions</h2>
                        <p className="text-gray-700">
                            In this privacy policy, Personal Data refers to any information that can identify you as an individual. Processing means any operation performed on your personal data,
                            such as collecting, storing, or using it. Data subject refers to you as the individual whose data is being processed. Child refers to individuals under the age of 16,
                            and We/Us refers to BlogSphere, the controller of the data.
                        </p>
                    </div>

                    {/* Data Protection Principles */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Data Protection Principles</h2>
                        <p className="text-gray-700">We are committed to protecting your personal data and promise to follow the below principles:</p>
                        <ul className="list-disc pl-9 space-y-2 text-gray-700">
                            <li>Processing your data fairly, lawfully, and transparently.</li>
                            <li>Collecting your data for specific, legitimate purposes and not further processing it in a manner that is incompatible with those purposes.</li>
                            <li>Minimizing the amount of personal data we collect and process to what is necessary.</li>
                            <li>Ensuring that your personal data is accurate and up-to-date.</li>
                            <li>Keeping your personal data only for as long as necessary for the purposes for which it was collected.</li>
                            <li>Implementing appropriate security measures to protect your personal data from unauthorized access or loss.</li>
                        </ul>
                    </div>

                    {/* Data Subject's Rights */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Your Rights Regarding Your Data</h2>
                        <p className="text-gray-700">You have several rights related to your personal data:</p>
                        <ul className="list-disc pl-9 space-y-2 text-gray-700">
                            <li>The right to access the personal data we hold about you.</li>
                            <li>The right to correct any inaccurate or incomplete personal data.</li>
                            <li>The right to request the deletion of your personal data under certain conditions.</li>
                            <li>The right to object to or restrict processing of your personal data in certain circumstances.</li>
                            <li>The right to withdraw consent for processing if consent was the basis for processing.</li>
                        </ul>
                    </div>

                    {/* Data We Gather */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Data We Collect</h2>
                        <p className="text-gray-700">We collect personal information that you provide to us directly, such as when you contact us or subscribe to our newsletter. This includes:</p>
                        <ul className="list-disc pl-9 space-y-2 text-gray-700">
                            <li>Your name, email address, and phone number.</li>
                            <li>Information you share with us through our contact form, comments, or social media interactions.</li>
                        </ul>
                        <p className="text-gray-700">We also collect data automatically through cookies, including information about your browsing behavior and device type.</p>
                    </div>

                    {/* How We Use Your Personal Data */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">How We Use Your Personal Data</h2>
                        <p className="text-gray-700">
                            The personal data we collect is used to enhance your experience on our website and provide you with content, updates, and services that are relevant to you. Specifically,
                            we may use your data for:
                        </p>
                        <ul className="list-disc pl-9 space-y-2 text-gray-700">
                            <li>Responding to inquiries or feedback.</li>
                            <li>Sending you newsletters or marketing communications (if you&apos;ve opted in).</li>
                            <li>Improving our website and content based on user feedback.</li>
                        </ul>
                        <p className="text-gray-700">We will never sell or share your data with third parties without your consent, except where necessary to comply with legal obligations.</p>
                    </div>

                    {/* Data Security */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">How We Protect Your Data</h2>
                        <p className="text-gray-700">
                            We take data security very seriously. We implement various security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.
                            These measures include encryption, access controls, and secure servers.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Contact Us</h2>
                        <p className="text-gray-700">
                            If you have any questions or concerns regarding this privacy policy or how we handle your personal data, please feel free to contact us at [your email address].
                        </p>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default PrivacyPolicy;
