import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "zepto-bookify | Home",
};

export default function page() {
    const DynamicHome = dynamic(
        () => import("@/components/home/Home"),
        {
            loading: () => <Loader />,
        }
    );
    return (
        <div><DynamicHome /></div>
    )
}
