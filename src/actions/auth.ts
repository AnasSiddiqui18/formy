'use server';

import { signInValidation, signUpValidation } from '@/app/validation';
import { db } from '@/db';
import { users } from '@/db/schema';
import { createAction } from '@/helpers';
import { auth } from '@/lib/auth';
import { env } from '@/lib/env';
import { sendError, sendSuccess } from '@/lib/response';
import argon from 'argon2';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

export const signUpAction = createAction(signUpValidation, async (data) => {
    const isEmailExist = await db.query.users.findFirst({
        where: eq(users.email, data.email),
    });

    if (isEmailExist) {
        return sendError('user already exist');
    }

    const hashedPassword = await argon.hash(data.password);

    const userObj: typeof users.$inferInsert = {
        ...data,
        password: hashedPassword,
    };

    const user = await db.insert(users).values(userObj).returning({
        email: users.email,
    });

    if (!user) return sendError('account creation failed!');

    return sendSuccess(user[0].email);
});

export const signInAction = createAction(signInValidation, async (data) => {
    const user = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email));

    if (!user.length) return sendError('user not found');

    const currentUser = user[0];

    const verifyPassword = await argon.verify(
        currentUser.password,
        data.password,
    );

    if (!verifyPassword) return sendError('password not valid');

    const session = await auth.createSession({ id: currentUser.id });

    if (!session.success) return sendError('Operation Failed');

    return sendSuccess(currentUser);
});

export const logOut = async () => await auth.deleteSession();

export async function verifyToken(token: string) {
    const verifiedToken = jwt.verify(token, env.JWT_SECRET) as {
        email: string;
    };

    const user = await db.query.users.findFirst({
        where: eq(users.email, verifiedToken.email),
        columns: {
            id: true,
        },
    });

    if (!user) return sendError('Verificaion failed.');

    const updateUser = await db
        .update(users)
        .set({ email_verified: true })
        .where(eq(users.id, user.id))
        .returning();

    if (!updateUser.length) return sendError('update failed');
    const { success } = await auth.createSession({ id: user.id });
    if (!success) return sendError('Operation failed');
    return sendSuccess('Operation successful');
}
