import { toUpperCase } from '@/lib/utils';
import { TCanvasData } from '@/types';
import { LucideIcon as IconType } from 'lucide-react';
import { AddIcon } from './add-icon';

export function NodeBox({
    data,
}: {
    data: {
        content: string;
        icon: IconType;
        type: TCanvasData['type'];
    };
}) {
    //

    return (
        <div className="bg-gray-200 size-[100px] flex flex-col gap-3 items-center justify-center rounded-lg shadow-md relative transition-all hover:shadow-lg hover:bg-gray-300">
            <AddIcon nodeType={data.type} />

            <div className="flex items-center justify-center bg-gray-100 rounded-full p-3">
                <data.icon className="text-gray-500 w-6 h-6" />
            </div>

            <h3 className="font-medium text-gray-700 text-sm text-center px-2">
                {toUpperCase(data.content)}
            </h3>
        </div>
    );
}
