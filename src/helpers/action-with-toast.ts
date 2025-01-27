import { ResponseType } from '@/lib/response';
import { showToast, toUpperCase } from '@/lib/utils';

export async function actionWithToast<T>(
    promise: Promise<ResponseType<T>> | ResponseType<T>,
    defaultMessage?: string,
) {
    const toast_id = showToast({
        variant: 'loading',
        message: 'Working on it...',
    }) as number;

    const response = await promise;

    if (!response.success) {
        showToast({
            variant: 'error',
            message: toUpperCase(defaultMessage ?? response.message) as string,
            props: {
                id: toast_id,
            },
        });
    } else {
        showToast({
            variant: 'success',
            message: toUpperCase(
                defaultMessage ?? (response.data as string),
            ) as string,
            props: {
                id: toast_id,
            },
        });
    }

    return response;
}
