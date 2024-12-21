import { TCanvasData } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { TextElement } from './text-element';
import { InputElement } from './input-element';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = ({
    data,
    isOverlay = false,
}: {
    data: TCanvasData;
    isOverlay?: boolean;
}) => {
    const {
        listeners,
        transform,
        transition,
        attributes,
        setNodeRef,
        isDragging,
    } = useSortable({
        id: data.id,
        transition: {
            duration: 300,
            easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
        },
    });

    const visibility = isDragging && !isOverlay ? 'hidden' : 'visible';

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} {...attributes} style={{ ...style, visibility }}>
            {data.type === 'heading' ||
            data.type === 'description' ||
            data.type === 'button' ? (
                <TextElement listeners={listeners} data={data} />
            ) : data.type === 'input' ? (
                <InputElement data={data} listeners={listeners} />
            ) : null}
        </div>
    );
};
