'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useQueryParams() {
    const searchParams = useSearchParams();
    const queryParams = Object.fromEntries(searchParams);
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    const pathName = usePathname();
    const router = useRouter();

    function setQueryParams(params: Partial<Record<string, string>>) {
        Object.entries(params).forEach(([key, value]) => {
            if (!value) return urlSearchParams.delete(key);
            urlSearchParams.set(key, String(value));
        });

        const search = urlSearchParams.toString();
        const query = search ? `?${search}` : '';
        return router.replace(`${pathName}${query}`);
    }

    return { queryParams, setQueryParams };
}
