export const sendSuccess = <T>(data: T) => ({
    success: true as const,
    data: data,
    message: null,
});

export const sendError = (message: string) => ({
    success: false as const,
    message,
    data: null,
});

export type ResponseType<T> =
    | ReturnType<typeof sendSuccess<T>>
    | ReturnType<typeof sendError>;
