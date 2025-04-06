import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "zepto-bookify | Wishlist",
};

export default function page() {
    const DynamicWishlist = dynamic(
        () => import("@/components/wishlist/Wishlist"),
        {
            loading: () => <Loader />,
        }
    );
    return (
        <div><DynamicWishlist /></div>
    )
}