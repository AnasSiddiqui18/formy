import { Button } from '@/components/ui/button';
import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

export function SuccessCard({
    setOpen,
    open,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] focus-visible:ring-0">
                <DialogHeader className="space-y-7 mb-4">
                    <DialogTitle>Form Submitted Successfully 🎉</DialogTitle>
                    <DialogDescription>
                        Your form has been submitted successfully! You can also
                        create forms like this using{' '}
                        <Link href="/" className="text-violet-600 font-bold">
                            Formy
                        </Link>
                        , our easy-to-use form builder application.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex justify-between">
                    <Button type="submit" onClick={() => setOpen(false)}>
                        understand!
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
