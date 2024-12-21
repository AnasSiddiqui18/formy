'use client';

import { useSnapshot } from 'valtio';
import { store } from '@/store';
import { useEffect, useMemo, useState } from 'react';
import { Button } from './ui/button';
import { emptyCanvas } from '@/actions/form';
import { actionWithToast } from '@/helpers/action-with-toast';
import {
    DndContext,
    DragEndEvent,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
    DragOverlay,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TCanvasData } from '@/types';
import { SortableItem } from './sortable-items';
import { cn } from '@/lib/utils';

export function Canvas({
    draftRes,
    formId,
}: {
    draftRes?: TCanvasData[];
    formId: string;
}) {
    const { canvasData } = useSnapshot(store);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        if (!draftRes) return;

        store.canvasData = draftRes;
    }, [draftRes]);

    async function canvasEmpty() {
        const response = await actionWithToast(emptyCanvas({ formId }));

        if (!response?.success) {
            console.log('operation not successful', response.message);
        }

        store.canvasData = [];
        store.currentSelectedNode = '';
    }

    function getTaskPosition(id: string) {
        return canvasData.findIndex((node) => node.id === id);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        const previousPos = getTaskPosition(active?.id as string);
        const newPos = getTaskPosition(over?.id as string);
        const modifiedPosition = arrayMove(
            [...canvasData],
            previousPos,
            newPos,
        );

        setActiveId(null);
        return (store.canvasData = modifiedPosition);
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
    );

    const activeItem = useMemo(() => {
        return canvasData.find((node) => node.id === activeId);
    }, [activeId, canvasData]);

    return (
        <div className="h-full bg-gray-300 flex-1 px-5 py-6 flex flex-col overflow-visible">
            <div className="flex justify-end mb-5">
                <Button
                    className="bg-red-800 hover:bg-red-900"
                    onClick={canvasEmpty}
                    disabled={!store.canvasData?.length}
                >
                    Clear Canvas
                </Button>
            </div>

            <div
                className={cn(
                    'flex flex-col gap-4 h-full overflow-auto pretty-scrollbar py-5',
                )}
            >
                <DndContext
                    onDragStart={(e) => setActiveId(e.active.id as string)}
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCorners}
                    sensors={sensors}
                >
                    <SortableContext
                        items={canvasData.map((e) => e.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {canvasData.map((data) => {
                            return <SortableItem key={data?.id} data={data} />;
                        })}
                    </SortableContext>

                    {/* overlay component */}
                    <DragOverlay>
                        {activeItem ? (
                            <SortableItem data={activeItem} isOverlay />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
}
