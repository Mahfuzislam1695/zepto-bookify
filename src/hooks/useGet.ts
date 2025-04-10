import { IGenericErrorMessage } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGet = <T>(endpoint: string, queryKey: string[], queryParams?: Record<string, unknown>) => {
    return useQuery<T, IGenericErrorMessage>({
        queryKey: queryKey,
        queryFn: async () => {
            try {
                // Construct query string from params
                const queryString = queryParams
                    ? `?${new URLSearchParams(queryParams as Record<string, string>).toString()}`
                    : '';

                const response = await fetch(`${endpoint}${queryString}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message || "Failed to fetch data.");
                } else {
                    toast.error("Failed to fetch data.");
                }
                throw error;
            }
        },
    });
};