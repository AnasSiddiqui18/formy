'use client';

import { ClearCanvasDialog } from '@/components/clear-canvas-dialog';
import { useSnapshot } from '@/hooks/use-snapshot';
import { cn } from '@/lib/utils';
import { store } from '@/store';
import { TCanvasData } from '@/types';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useMemo, useState } from 'react';
import { SortableItem } from './sortable-items';

export function Canvas({ draftRes }: { draftRes?: TCanvasData[] }) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const { canvasData } = useSnapshot(store);

    useEffect(() => {
        if (!draftRes) return;

        store.canvasData = draftRes;
    }, [draftRes]);

    function getTaskPosition(id: string) {
        return canvasData.findIndex((node) => node.id === id);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        const previousPos = getTaskPosition(active?.id as string);
        const newPos = getTaskPosition(over?.id as string);
        const modifiedPosition = arrayMove(canvasData, previousPos, newPos);
        setActiveId(null);
        return (store.canvasData = modifiedPosition);
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    const activeItem = useMemo(() => {
        return canvasData.find((node) => node.id === activeId);
    }, [activeId, canvasData]);

    return (
        <div
            className={cn(
                'h-full bg-gray-300 flex-1 px-5 py-6 flex flex-col overflow-visible',
                {
                    'canvas-img': !canvasData.length,
                },
            )}
        >
            <div className="flex justify-end mb-5">
                <ClearCanvasDialog />
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
