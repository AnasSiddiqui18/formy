import jwt from 'jsonwebtoken';
import { env } from './env';
import parse from 'parse-duration';
import { db } from '@/db';
import { cookies } from 'next/headers';
import { cache } from 'react';

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
            try {
                const cookie = await cookies();
                const cookieVal = cookie.get('session')?.value;
                if (!cookieVal?.length) return;

                const { data } = await auth.getCurrentSession();

                const user = await db.query.users.findFirst({
                    where: (arg1, arg2) => {
                        return arg2.eq(arg1.id, data);
                    },
                    columns: {
                        createdAt: true,
                        fullName: true,
                        email: true,
                        id: true,
                        updatedAt: true,
                    },
                });

                return user ?? null;
            } catch (error) {
                console.log('error while getting the user', error);
                return null;
            }
        }),

        deleteSession: async () => {
            const cookie = await cookies();
            if (!cookie.has('session')) return null;
            cookie.delete('session');

            if (!cookie.has('session')) {
                return { success: true };
            }
        },
    };
}

export const auth = Auth();
