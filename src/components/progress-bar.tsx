'use client';

import { AppProgressBar } from 'next-nprogress-bar';

export function Progressbar() {
    return (
        <AppProgressBar
            options={{ showSpinner: false }}
            color="#8b5cf6"
            height="3px"
        />
    );
}
