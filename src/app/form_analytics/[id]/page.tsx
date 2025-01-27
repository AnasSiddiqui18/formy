import { AnalyticsCard } from '@/components/analytics/analytics-card';
import { fetchFormById } from '@/features/form';
export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: formId } = await params;
    const forms = await fetchFormById({ formId });
    if (!forms.success) return;

    const { data: form_data } = forms;

    return (
        <div className="px-section_padding py-5 space-y-8 h-view">
            <AnalyticsCard form={form_data} />
        </div>
    );
}
