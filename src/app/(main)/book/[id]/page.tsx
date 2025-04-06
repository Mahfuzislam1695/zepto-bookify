import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "zepto-bookify | Book-detail",
};

export default function page() {
    const DynamicBookDetails = dynamic(
        () => import("@/components/book/Book"),
        {
            loading: () => <Loader />,
        }
    );
    return (
        <div><DynamicBookDetails /></div>
    )
}