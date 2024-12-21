'use client';

import { sendSuccess } from '@/lib/response';

export function useCopyToClipboard() {
    async function main(string: string) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigator.clipboard.writeText(string);
        return sendSuccess('url copied 🎉');
    }

    return { main };
}
