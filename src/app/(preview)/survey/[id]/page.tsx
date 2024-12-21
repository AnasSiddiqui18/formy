import { getFormByStatus } from '@/actions/form';
import { SurveyForm } from '@/components/survey-form';

export default async function SurveyPage({
    params,
}: {
    params: { id: string };
}) {
    const { id: formId } = await params;
    const formRes = await getFormByStatus({ formId, formStatus: 'PUBLISHED' }); // making sure that we will get the form only if the form is published.

    if ('message' in formRes) return console.error(formRes.message);

    return (
        <div className="min-h-view">
            <SurveyForm formRes={formRes.schema} />
        </div>
    );
}
