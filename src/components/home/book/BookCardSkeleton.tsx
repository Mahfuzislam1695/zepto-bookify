"use client"

export default function BookCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-md shadow-sm overflow-hidden h-80 animate-pulse">
            <div className="h-56 bg-gray-200 dark:bg-gray-800"></div>
            <div className="p-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
            </div>
        </div>
    )
}
// "use client"

// import { Skeleton } from "@/components/ui/skeleton"

// export const BookCardSkeleton = () => (
//     <div className="space-y-4">
//         <Skeleton className="aspect-[2/3] w-full rounded-md" />
//         <div className="space-y-2">
//             <Skeleton className="h-4 w-3/4" />
//             <Skeleton className="h-4 w-1/2" />
//         </div>
//     </div>
// )