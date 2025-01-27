'use server';

import {
    buttonSchema,
    descriptionSchema,
    headingSchema,
    inputSchema,
} from '@/app/validation';
import { db } from '@/db';
import { User, forms } from '@/db/schema';
import { isAuthorized } from '@/helpers';
import { sendError, sendSuccess } from '@/lib/response';
import { TCanvasData, TStatus } from '@/types';
import cuid2 from '@paralleldrive/cuid2';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

export const createFormAction = isAuthorized(async function (
    user: User,
    args: { title: string },
) {
    const formAlreadyExist = await db.query.forms.findFirst({
        where: eq(forms.title, args.title),
    });

    if (formAlreadyExist) {
        return sendError('form already exist');
    }

    await db
        .insert(forms)
        .values({
            title: args.title,
            user_id: user.id,
        })
        .returning();

    return sendSuccess('form created successfully');
});

export const getFormsAction = isAuthorized(async (user) => {
    const response = await db.query.forms.findMany({
        where: eq(forms.user_id, user.id),
    });

    return sendSuccess(response);
});

export const deleteFormAction = isAuthorized(async function (
    user: User,
    args: {
        formId: string;
    },
) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const delForm = await db
            .delete(forms)
            .where(and(eq(forms.id, args.formId), eq(forms.user_id, user.id)))
            .returning();

        if (!delForm.length) {
            throw new Error('user not authorized or form not found');
        }

        return sendSuccess('Form deleted successfully');
    } catch (error) {
        console.log('error while deleting the form', error);
        return sendError('Form deletion failed');
    }
});

export async function isFormExist({ formId }: { formId: string }) {
    const response = await db.query.forms.findFirst({
        where: eq(forms.id, formId),
    });

    if (!response) return sendError("Form doesn't exist, redirecting...");

    return { success: true };
}

export const saveCanvasToDB = isAuthorized(async function (
    user: User,
    args: {
        canvasData: TCanvasData[];
        formId: string;
    },
) {
    const { canvasData } = args;

    const updatedCanvasData = canvasData.map((data) => ({
        ...data,
        id: cuid2.createId(),
    }));

    const validation = z.array(
        z.union([headingSchema, descriptionSchema, inputSchema, buttonSchema]),
    );

    const result = validation.safeParse(canvasData);

    if (!result.success) return sendError('Failed to save canvas.');

    const response = await db
        .update(forms)
        .set({ schema: updatedCanvasData })
        .where(and(eq(forms.id, args.formId), eq(forms.user_id, user.id)))
        .returning();

    if (!response.length) return sendError('Failed to save canvas.');

    const { schema } = response[0];
    return sendSuccess(schema);
});

export const getForm = isAuthorized(async function (
    user,
    args: {
        formId: string;
    },
) {
    const { formId } = args;

    if (!user) return sendError('unauthorized action');

    const form = await db.query.forms.findFirst({
        where: and(eq(forms.id, formId), eq(forms.user_id, user.id)),
    });

    if (!form) {
        return sendError('Form not found or unauthorized action');
    }

    return sendSuccess(form);
});

export async function getFormByStatus({
    formId,
    formStatus,
}: {
    formId: string;
    formStatus: TStatus;
}) {
    const form = await db.query.forms.findFirst({
        where: and(eq(forms.id, formId), eq(forms.status, formStatus)),
    });

    if (!form) {
        return sendError('Form not found!');
    }

    return sendSuccess(form);
}

export const emptyCanvas = isAuthorized(async function (
    user,
    args: { formId: string },
) {
    const { formId } = args;

    const emptyCanvas = await db
        .update(forms)
        .set({
            schema: [],
        })
        .where(and(eq(forms.id, formId), eq(forms.user_id, user.id)))
        .returning();

    if (!emptyCanvas) return sendError('Operation failed');

    return sendSuccess('Canvas cleared');
});

export const updateFormStatus = isAuthorized(async function (
    user,
    args: {
        formId: string;
        status: TStatus;
    },
) {
    const { formId, status } = args;

    const updateStatus = await db
        .update(forms)
        .set({
            status,
        })
        .where(and(eq(forms.id, formId), eq(forms.user_id, user.id)))
        .returning();

    if (!updateStatus) {
        return sendError('Operation failed');
    }

    if (status === 'PUBLISHED') {
        return sendSuccess('Form published');
    }

    return sendSuccess('Operation successful');
});
