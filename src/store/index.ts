import { TCanvasData } from '@/types';
import { proxy } from 'valtio';

type StoreT = {
    canvasData: TCanvasData[];
    currentSelectedNode: string | null;
    get: <T extends TCanvasData['type']>(
        id: string | null,
        type: T,
    ) => Extract<TCanvasData, { type: T }> | null;
    isPreviewCardOpen: boolean;
    name: string;
};

export const store = proxy<StoreT>({
    canvasData: [],
    currentSelectedNode: null,
    get<T extends TCanvasData['type']>(id: string | null, type: T) {
        if (!id) return null;

        const nodeById = this.canvasData.find((node) => node.id === id);
        if (!nodeById) {
            throw new Error(`Node of type ${type} with id ${id} not found.`);
        }

        return nodeById as Extract<TCanvasData, { type: T }> | null;
    },
    isPreviewCardOpen: false,
    name: 'sam',
});
