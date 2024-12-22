'use client';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTransition } from 'react';
import { actionWithToast } from '@/helpers/action-with-toast';
import { sendSuccess } from '@/lib/response';

export function CopyLinkBox({ formId }: { formId: string }) {
    const [isPending, startTransition] = useTransition();

    function generateURL() {
        const { port } = window.location;
        const url = `http://localhost:${port}/survey/${formId}`;
        window.navigator.clipboard.writeText(url);
        return sendSuccess(`http://localhost:${port}/survey/${formId}`);
    }

    function handleCopy() {
        startTransition(async () => {
            await actionWithToast(generateURL());
        });
    }

    return (
        <div className="flex justify-between gap-2 mt-2">
            <Input
                value={generateURL().data}
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
