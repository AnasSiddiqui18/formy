'use client';

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTransition } from 'react';
import { actionWithToast } from '@/helpers/action-with-toast';

export function CopyLinkBox({ formId }: { formId: string }) {
    const { main } = useCopyToClipboard();
    const [isPending, startTransition] = useTransition();

    function generateURL() {
        if (typeof window === 'undefined') return;

        const { port } = window.location;
        return `http://localhost:${port}/survey/${formId}`;
    }

    function handleCopy() {
        startTransition(async () => {
            await actionWithToast(main(generateURL()!));
        });
    }

    return (
        <div className="flex justify-between gap-2 mt-2">
            <Input
                value={generateURL()}
                placeholder="published form url..."
                readOnly
                className="focus-visible:ring-0 text-gray-400"
            />

            <Button
                className="bg-violet-500 hover:bg-violet-600 text-white disabled:opacity-50"
                onClick={handleCopy}
                disabled={isPending}
            >
                Copy
            </Button>
        </div>
    );
}
