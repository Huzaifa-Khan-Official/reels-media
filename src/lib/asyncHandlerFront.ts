import { ApiError } from "@/utils/ApiError";

// export const asyncHandlerFront = async <T>(
//     fn: () => Promise<T>,
//     onError?: (error: ApiError) => void
// ) => {
//     try {
//         return await fn();
//     } catch (error) {
//         if (error instanceof ApiError) {
//             onError?.(error);
//         } else {
//             console.error(error);
//         }
//     }
// };


// ./src/utils/asyncHandlerFront.ts


export const asyncHandlerFront = async <T>(
    fn: () => Promise<T>,
    onError?: (error: ApiError) => void
) => {
    try {
        return await fn();
    } catch (error) {
        if (error instanceof ApiError) {
            onError?.(error);
        } else {
            console.error('Unexpected error:', error);
        }
    }
};
