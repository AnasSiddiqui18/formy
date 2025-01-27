import { getFormByStatus } from '@/actions/form';
import { FormNotExist } from '@/components/form-not-exist-card';
import { SurveyForm } from '@/components/survey-form';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SurveyPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: formId } = await params;

    const formRes = await getFormByStatus({ formId, formStatus: 'PUBLISHED' });

    if (!formRes.success || !formRes.data.schema.length)
        return <FormNotExist />;

    const user = await auth.getUser();
    if (!user.success) redirect(`/sign-in?redirect=/survey/${formId}`);

    return (
        <div className="min-h-view">
            <SurveyForm data={formRes.data.schema} />
        </div>
    );
}
