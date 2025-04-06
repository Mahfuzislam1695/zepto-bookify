import { type LucideIcon } from 'lucide-react'
import Link from "next/link"

interface EmptyStateProps {
    icon?: LucideIcon
    title: string
    description?: string
    actionLabel?: string
    actionHref?: string
    actionOnClick?: () => void
    className?: string
}

export default function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    actionHref,
    actionOnClick,
    className = "",
}: EmptyStateProps) {
    return (
        <div className={`text-center py-16 bg-white dark:bg-gray-900 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in ${className}`}>
            {Icon && (
                <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    <Icon className="h-6 w-6 text-gray-400" />
                </div>
            )}

            <h2 className="text-xl font-medium text-gray-900 dark:text-white">{title}</h2>

            {description && (
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    {description}
                </p>
            )}

            {(actionLabel && actionHref) && (
                <Link
                    href={actionHref}
                    className="mt-6 inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200"
                >
                    {actionLabel}
                </Link>
            )}

            {(actionLabel && actionOnClick) && (
                <button
                    onClick={actionOnClick}
                    className="mt-6 inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    )
}
