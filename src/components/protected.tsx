import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const Protected = async ({ children }: { children: ReactNode }) => {
    const user = await auth.getUser();
    if (!user) return redirect('/sign-in');

    return <>{children}</>;
};

export default Protected;
