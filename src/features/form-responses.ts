import { db } from '@/db';
import { formResponses } from '@/db/schema';
import { isAuthorized } from '@/helpers';
import { sendError, sendSuccess } from '@/lib/response';
import { eq } from 'drizzle-orm';

export const fetchFormResponses = isAuthorized(async function (
    _user,
    args: {
        formId: string;
        limit: number;
        offset: number;
    },
) {
    try {
        const { formId, limit, offset } = args;

        const responses = await db.query.formResponses.findMany({
            where: eq(formResponses.form_id, formId),
            limit,
            offset,
        });

        if (!responses.length) throw new Error('responses not found');

        return sendSuccess(responses);
    } catch (error) {
        return sendError('Something went wrong.');
    }
});
