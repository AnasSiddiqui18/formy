'use server';

import argon from 'argon2';
import { db } from '@/db';
import { users } from '@/db/schema';
import { sendError, sendSuccess } from '@/lib/response';
import { createAction } from '@/helpers';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { signUpValidation, signInValidation } from '@/app/validation';

export const signUpAction = createAction(signUpValidation, async (data) => {
    const isEmailExist = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email));

    if (isEmailExist.length) {
        console.log('duplicate user found', isEmailExist);
        return sendError('user already exist');
    }

    const hashedPassword = await argon.hash(data.password);

    const userObj: typeof users.$inferInsert = {
        ...data,
        password: hashedPassword,
    };

    await db.insert(users).values(userObj).returning({
        fullName: users.fullName,
        email: users.email,
    });

    return sendSuccess('user created successfully 🎉');
});

export const signInAction = createAction(signInValidation, async (data) => {
    const user = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email));

    if (!user.length) {
        return sendError('user not found');
    }

    const verifyPassword = await argon.verify(user[0].password, data.password);

    if (!verifyPassword) {
        return sendError('password not valid');
    }

    const session = await auth.createSession({ id: user[0].id });

    if (!session.success) {
        return sendError('Failed to signIn');
    }

    return sendSuccess('user signin successfully');
});

export const logOut = async () => await auth.deleteSession();
