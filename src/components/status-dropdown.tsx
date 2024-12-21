'use client';

import { Button } from './ui/button';
import {
    AlertDialogDescription,
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from './ui/alert-dialog';
import { TStatus } from '@/types';

export function StatusDropdown({
    toggleStatus,
    isPending,
    open,
    setOpen,
}: {
    toggleStatus: (status: TStatus) => Promise<void>;
    isPending: boolean;
    open: boolean;
    setOpen: (val: boolean) => void;
}) {
    return (
        <AlertDialog
            open={open}
            onOpenChange={() => {
                setOpen(true);
            }}
        >
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
                        className="bg-red-500 hover:bg-red-600"
                        asChild
                    >
                        <Button
                            disabled={isPending}
                            className="bg-red-500 hover:bg-red-600"
                            onClick={async () => {
                                await toggleStatus('INACTIVE');
                            }}
                        >
                            {isPending ? 'Deactivating...' : 'Deactivate'}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
