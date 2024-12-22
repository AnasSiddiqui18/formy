import { ResponseType } from '@/lib/response';
import { toUpperCase } from '@/lib/utils';
import { toast } from 'sonner';

export async function actionWithToast<T>(
    promise: Promise<ResponseType<T>> | ResponseType<T>,
    defaultMessage?: string,
) {
    const toastID = toast.loading('Processing your request...', {
        position: 'top-center',
    });

    const response = await promise;

    if (!response.success) {
        toast.error(
            toUpperCase(defaultMessage ?? (response.message as string)),
            {
                id: toastID,
                duration: 1.5,
            },
        );
    } else {
        toast.success(
            toUpperCase(defaultMessage ?? (response.data as string)),
            {
                id: toastID,
                duration: 1.5,
            },
        );
    }

    return response;
}
