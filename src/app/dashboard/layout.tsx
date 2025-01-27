import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { Protected } from '@/helpers';

export default Protected(function ({ children }) {
    return (
        <div className="flex">
            <DashboardSidebar />
            {children}
        </div>
    );
});
