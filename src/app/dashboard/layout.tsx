import { DashboardSidebar } from '@/components/dashboard-sidebar';
import Protected from '@/components/protected';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
    return (
        <div className="flex">
            <Protected>
                <DashboardSidebar />
                {children}
            </Protected>
        </div>
    );
}
