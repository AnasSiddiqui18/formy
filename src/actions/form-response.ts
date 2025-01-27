'use server';

import { createZodSchema } from '@/components/codebox/create-zod-schema';
import { db } from '@/db';
import { formResponses, forms, users } from '@/db/schema';
import { isAuthorized } from '@/helpers';
import { auth } from '@/lib/auth';
import { sendError, sendSuccess } from '@/lib/response';
import { TCanvasData } from '@/types';
import { subDays } from 'date-fns';
import { and, asc, eq, gte, sql } from 'drizzle-orm';
import { DatabaseError } from 'pg';

const isDbError = (error: unknown) => error instanceof DatabaseError;

export const createFormResponse = isAuthorized(async function (
    user,
    args: {
        values: Record<string, string>;
        data: TCanvasData[];
        form_id: string;
    },
) {
    try {
        const { data, form_id, values } = args;
        const schema = createZodSchema(data);
        const validated = schema.safeParse(values);
        if (!validated.success) return sendError('Operation faileds');

        await db.insert(formResponses).values({
            content: values,
            form_id,
            respondent_id: user.id,
        });

        return sendSuccess('Form submitted!');
    } catch (error) {
        if (isDbError(error)) {
            if (error.code === '23505') {
                return sendError('Record already exist');
            }
        }

        return sendError('Operation failed');
    }
});

export const deleteResponse = isAuthorized(async function (
    {},
    args: {
        response_id: string;
    },
) {
    const { response_id } = args;
    const user = await auth.getUser();
    if (!user.success) return sendError('user not found');
    const delResponse = await db
        .delete(formResponses)
        .where(
            and(
                eq(formResponses.id, response_id),
                eq(formResponses.respondent_id, user.data.id),
            ),
        );

    if (!delResponse) return sendError('Operation failed');
    return sendSuccess('form response deleted');
});

export const fetchResponse = isAuthorized(async function (
    { id: user_id },
    args: {
        response_id: string;
    },
) {
    try {
        const { response_id } = args;

        const response = await db
            .select({
                content: formResponses.content,
                form_id: formResponses.form_id,
                response_id: formResponses.id,
                created_at: formResponses.created_at,
                respondent_name: users.full_name,
                form_name: forms.title,
            })
            .from(formResponses)
            .leftJoin(users, eq(formResponses.respondent_id, users.id))
            .leftJoin(forms, eq(formResponses.form_id, forms.id))
            .where(
                and(
                    eq(formResponses.id, response_id),
                    eq(forms.user_id, user_id),
                ),
            );

        if (!response.length) return sendError('response not found');

        return sendSuccess(response);
    } catch (error) {
        if (isDbError(error)) {
            return sendError(error.name);
        }

        return sendError('Operation Failed');
    }
});

export const fetchFormResponses = isAuthorized(async function (
    _user,
    args: {
        formId: string;
        range: number;
    },
) {
    const { formId, range } = args;

    try {
        const pastDateStr = subDays(new Date(), range);

        const grouppedResponses = await db
            .select({
                date: sql<string>`DATE(${formResponses.created_at})`.as('date'),
                submissions:
                    sql<number>`CAST(COUNT(${formResponses}) AS INTEGER)`.as(
                        'submissions',
                    ),
            })
            .from(formResponses)
            .where(
                and(
                    eq(formResponses.form_id, formId),
                    gte(formResponses.created_at, pastDateStr),
                ),
            )
            .groupBy(sql`DATE(${formResponses.created_at})`)
            .orderBy(asc(sql`DATE(${formResponses.created_at})`));

        return sendSuccess(grouppedResponses);
    } catch (error) {
        return sendError('Something went wrong.');
    }
});
