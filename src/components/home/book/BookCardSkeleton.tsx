"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const BookCardSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="aspect-[2/3] w-full rounded-md" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
    </div>
)