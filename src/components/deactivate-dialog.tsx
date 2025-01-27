'use client';

import { updateFormStatus } from '@/actions/form';
import { actionWithToast } from '@/helpers/action-with-toast';
import { useFormId } from '@/hooks/use-form-id';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';

export function DeactivateDialog() {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const formId = useFormId();
    const router = useRouter();

    function deactivateForm() {
        startTransition(async () => {
            const response = await actionWithToast(
                updateFormStatus({
                    formId: formId,
                    status: 'DRAFT',
                }),
            );

            setOpen(false);
            if (!response.success) return;
            return router.refresh();
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="bg-red-600 text-white hover:bg-red-700">
                    Deactivate
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="pointer-events-none">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action is irreversible. Deactivating the form will
                        prevent users from accessing or filling it
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        asChild
                        onClick={(e) => e.preventDefault()}
                    >
                        <Button
                            disabled={isPending}
                            className="bg-red-500 hover:bg-red-600"
                            onClick={deactivateForm}
                        >
                            {isPending ? 'Deactivating...' : 'Deactivate'}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
