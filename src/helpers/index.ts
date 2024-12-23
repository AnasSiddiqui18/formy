import { User } from '@/db/schema';
import { auth } from '@/lib/auth';
import { ResponseType, sendError } from '@/lib/response';
import { ZodSchema } from 'zod';

export function createAction<T extends ZodSchema, E>(
    schema: T,
    action: (data: T['_output']) => Promise<ResponseType<E>>,
) {
    return async (val: T['_input']) => {
        const validated = schema.safeParse(val);

        if (!validated.success) return sendError('validation failed');

        return action(validated.data);
    };
}

export function isAuthorized<T extends unknown[], k>(
    action: (user: User, ...args: T) => Promise<ResponseType<k>>,
) {
    return async (...args: T) => {
        const user = await auth.getUser();

        if (!user) {
            return sendError('unAuthorized request');
        }

        return action(user, ...args);
    };
}
