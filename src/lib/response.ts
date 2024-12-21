export const sendSuccess = <T>(data: T) => ({
    success: true,
    data: data,
    message: null,
});

export const sendError = <T>(message: T) => ({
    success: false,
    message,
    data: null,
});

export type ResponseType<T> =
    | ReturnType<typeof sendSuccess<T>>
    | ReturnType<typeof sendError<T>>;
