import { db } from '@/db';
import { formResponses, forms } from '@/db/schema';
import { isAuthorized } from '@/helpers';
import { sendError, sendSuccess } from '@/lib/response';
import { eq, sql } from 'drizzle-orm';

export const fetchFormById = isAuthorized(async function (
    _user,
    args: {
        formId: string;
    },
) {
    const { formId } = args;

    const form = await db.query.forms.findFirst({
        where: eq(forms.id, formId),
        extras: {
            responsesCount:
                sql<string>`(SELECT COUNT(*) FROM ${formResponses} WHERE ${formResponses}.form_id = ${forms}.id)`.as(
                    'responsesCount',
                ),
        },
    });

    if (!form) return sendError('form not found');
    return sendSuccess(form);
});
