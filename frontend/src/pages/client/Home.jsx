import Loading from "@/components/common/Loading";
import { lazy, Suspense } from "react";
const HomeBanner = lazy(() => import("@/components/client/Home/HomeBanner"));

const Home = () => {
    return (
        <section className="w-full">
            <Suspense fallback={<Loading />}>
                <HomeBanner />
            </Suspense>
        </section>
    );
};

export default Home;
