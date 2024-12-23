'use server';

import {
    buttonSchema,
    descriptionSchema,
    headingSchema,
    inputSchema,
} from '@/app/validation';
import { db } from '@/db';
import { Form, User, forms } from '@/db/schema';
import { isAuthorized } from '@/helpers';
import { auth } from '@/lib/auth';
import { sendSuccess, sendError, ResponseType } from '@/lib/response';
import { TCanvasData, TStatus } from '@/types';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

export const createFormAction = await isAuthorized(async function (
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
            userId: user.id,
        })
        .returning();

    return sendSuccess('form created successfully');
});

export const getFormsAction = await isAuthorized(async (user) => {
    const response = await db.query.forms.findMany({
        where: eq(forms.userId, user.id),
    });

    return sendSuccess(response);
});

export const deleteFormAction = await isAuthorized(async function (
    user: User,
    args: {
        formId: string;
    },
) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const delForm = await db
            .delete(forms)
            .where(and(eq(forms.id, args.formId), eq(forms.userId, user.id)))
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

export const saveCanvasToDB = await isAuthorized(async function (
    user: User,
    args: {
        canvasData: TCanvasData[];
        formId: string;
    },
) {
    const validation = z.array(
        z.union([headingSchema, descriptionSchema, inputSchema, buttonSchema]),
    );

    const result = validation.safeParse(args.canvasData);

    if (!result.success) return sendError('Failed to save canvas.');

    const response = await db
        .update(forms)
        .set({ schema: args.canvasData })
        .where(and(eq(forms.id, args.formId), eq(forms.userId, user.id)))
        .returning();

    if (!response.length) return sendError('Failed to save canvas.');
    return sendSuccess('canvas saved!');
});

export async function getForm({ formId }: { formId: string }) {
    const user = await auth.getUser();

    if (!user) return sendError('unauthorized action');

    const form = await db.query.forms.findFirst({
        where: and(eq(forms.id, formId), eq(forms.userId, user!.id)),
    });

    if (!form) {
        return sendError('Form not found or unauthorized action');
    }

    return sendSuccess(form);
}

export async function getFormByStatus({
    formId,
    formStatus,
}: {
    formId: string;
    formStatus: TStatus;
}): Promise<ResponseType<string> | Form> {
    const form = await db.query.forms.findFirst({
        where: and(eq(forms.id, formId), eq(forms.status, formStatus)),
    });

    if (!form) {
        return sendError('Form not found!');
    }

    return form;
}

export const isNodePresentInDB = async ({
    formId,
    nodeId,
}: {
    formId: string;
    nodeId: string;
}) => {
    const form = await db.query.forms.findFirst({
        where: eq(forms.id, formId),
    });

    const schema = form?.schema.find((node) => node.id === nodeId);

    if (!schema) {
        return sendError('schema not found');
    }

    return sendSuccess('schema exist');
};

export const deleteCanvasEl = await isAuthorized(async function (
    user: User,
    args: {
        formId: string;
        nodeId: string;
    },
) {
    const { formId, nodeId } = args;

    const form = await db.query.forms.findFirst({
        where: and(eq(forms.id, formId), eq(forms.userId, user.id)),
    });

    if (!form) {
        return sendError('form or form schema not found');
    }

    const updatedSchema = form.schema.filter(
        (node: TCanvasData) => node.id !== nodeId,
    );

    const updatedForm = await db
        .update(forms)
        .set({
            schema: updatedSchema,
        })
        .where(and(eq(forms.id, formId), eq(forms.userId, user.id)))
        .returning();

    if (!updatedForm) {
        return sendError('Operation failed');
    }

    console.log('updated form', updatedForm);

    return sendSuccess('Node deleted successfully');
});

export const emptyCanvas = await isAuthorized(async function (
    user,
    args: { formId: string },
) {
    const { formId } = args;

    const emptyCanvas = await db
        .update(forms)
        .set({
            schema: [],
        })
        .where(and(eq(forms.id, formId), eq(forms.userId, user.id)))
        .returning();

    if (!emptyCanvas) return sendError('Operation failed');

    return sendSuccess('Canvas cleared');
});

export const toggleFormStatus = await isAuthorized(async function (
    user,
    args: {
        formId: string;
        status: 'DRAFT' | 'PUBLISHED' | 'INACTIVE';
    },
) {
    const { formId, status } = args;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const updateFormStatus = await db
        .update(forms)
        .set({
            status,
        })
        .where(and(eq(forms.id, formId), eq(forms.userId, user.id)))
        .returning();

    if (!updateFormStatus) {
        return sendError('Operation failed or unAuthorized request');
    }

    if (status === 'PUBLISHED') {
        return sendSuccess('Form published');
    }

    return sendSuccess('Operation successful');
});
