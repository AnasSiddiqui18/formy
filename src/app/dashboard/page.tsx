import { getFormsAction } from '@/actions/form';
import { ListForms } from '@/components/list-forms';

export default async function Dashboard() {
    const forms = await getFormsAction();

    if (forms.success === false) return console.error(forms);

    return <ListForms formList={forms.data!} />;
}
