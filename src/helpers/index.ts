import { User } from '@/db/schema';
import { auth } from '@/lib/auth';
import { ResponseType, sendError } from '@/lib/response';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';
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
        if (!user.success) return sendError('unAuthorized request');
        try {
            return await action(user.data, ...args);
        } catch (error) {
            console.log(error);

            if (isRedirectError(error)) throw error;
            return sendError('something went wrong');
        }
    };
}

export function Protected(
    fn: ({ children, user }: PropsWithChildren & { user: User }) => ReactNode,
) {
    return async ({ children }: PropsWithChildren) => {
        const user = await auth.getUser();
        if (!user.success) redirect('/sign-in');
        return fn({
            children,
            user: user.data,
        });
    };
}
