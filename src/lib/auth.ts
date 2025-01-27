import { db } from '@/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import parse from 'parse-duration';
import { cache } from 'react';
import { env } from './env';
import { sendError, sendSuccess } from './response';

function Auth() {
    return {
        createSession: async function ({ id }: { id: string }) {
            const expiresIn = parse('30d')!; // ms

            const jwtToken = jwt.sign({ userId: id }, env.JWT_SECRET, {
                expiresIn,
            });

            const cookie = await cookies();

            cookie.set('session', jwtToken, {
                expires: new Date(Date.now() + expiresIn),
                secure: true,
                httpOnly: true,
            });

            return { success: true };
        },

        getCurrentSession: async function () {
            const currentSession = (await cookies()).get('session')
                ?.value as string;

            const decodedToken = jwt.verify(currentSession, env.JWT_SECRET) as {
                userId: string;
            };

            return { success: true, data: decodedToken.userId };
        },

        getUser: cache(async () => {
            const cookie = await cookies();

            try {
                const cookieVal = cookie.get('session')?.value;

                if (!cookieVal?.length) return sendError('cookie not found');

                const { data: userId } = await auth.getCurrentSession();

                const user = await db.query.users.findFirst({
                    where: (arg1, arg2) => {
                        return arg2.eq(arg1.id, userId);
                    },
                    columns: {
                        created_at: true,
                        full_name: true,
                        email: true,
                        id: true,
                        updated_at: true,
                    },
                });

                if (!user) return sendError('user not found');
                return sendSuccess(user);
            } catch (error) {
                return sendError('something went wrong in getUser');
            }
        }),

        deleteSession: async () => {
            const cookie = await cookies();
            if (!cookie.has('session'))
                return sendError("Cookie doesn't exist");
            cookie.delete('session');

            return sendSuccess('Logout Successfully');
        },
    };
}

export const auth = Auth();
