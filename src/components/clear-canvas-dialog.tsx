import { emptyCanvas } from '@/actions/form';
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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { actionWithToast } from '@/helpers/action-with-toast';
import { useFormId } from '@/hooks/use-form-id';
import { store } from '@/store';
import { useState, useTransition } from 'react';

export function ClearCanvasDialog() {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const formId = useFormId();

    function canvasEmpty() {
        startTransition(async () => {
            const response = await actionWithToast(emptyCanvas({ formId }));
            if (!response?.success) return;
            store.canvasData = [];
            store.currentSelectedNode = '';
            setOpen(false);
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    className="bg-red-800 text-white hover:bg-red-900"
                    disabled={!store.canvasData.length}
                >
                    Clear Canvas
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="pointer-events-none">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action is irreversible. Making the canvas empty
                        will remove all the selected nodes.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        asChild
                        onClick={(e) => e.preventDefault()}
                    >
                        <Button
                            className="bg-red-500 hover:bg-red-600"
                            onClick={canvasEmpty}
                            disabled={isPending}
                        >
                            {isPending ? 'Working...' : 'Empty'}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
