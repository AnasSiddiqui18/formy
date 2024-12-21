import { CopyLinkBox } from '@/components/CopyLinkBox';

export default async function PublishForm({
    params,
}: {
    params: { id: string };
}) {
    const { id: formId } = await params;

    return (
        <div className="min-h-view bg-white flex justify-center items-center grid-bg relative">
            <div className="bg-black opacity-50 absolute w-full h-full z-0"></div>

            <div className="max-w-[400px] h-[250px] w-full dark:border border-2 py-5 px-5 flex flex-col gap-4 rounded-xl bg-white z-10">
                <h2 className="text-gray-700 text-2xl font-bold">
                    Form published 🚀
                </h2>
                <p className="text-gray-500 text-sm">
                    🎉 Your form has been successfully published! You can now
                    share it with others and start collecting responses
                    seamlessly.
                </p>
                <CopyLinkBox formId={formId} />
            </div>
        </div>
    );
}
