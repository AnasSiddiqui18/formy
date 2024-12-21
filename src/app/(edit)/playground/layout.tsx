import Protected from '@/components/protected';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    return <Protected>{children}</Protected>;
}
