'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { env } from '@/lib/env';
import { showToast } from '@/lib/utils';

export function CopyLinkBox({ formId }: { formId: string }) {
    const url = `${env.NEXT_PUBLIC_PORT}/survey/${formId}`;

    return (
        <div className="flex justify-between gap-2 mt-2">
            <Input
                placeholder="published form url..."
                readOnly
                className="focus-visible:ring-0 text-gray-400"
                value={url}
            />

            <Button
                className="bg-violet-500 hover:bg-violet-600 text-white disabled:opacity-50"
                onClick={() => {
                    window.navigator.clipboard.writeText(url);
                    return showToast({
                        variant: 'success',
                        message: 'Copied!',
                    });
                }}
            >
                Copy
            </Button>
        </div>
    );
}
