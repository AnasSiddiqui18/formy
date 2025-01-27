import { useSnapshot as useBaseSnapShot } from 'valtio';

export function useSnapshot<T extends object>(store: T) {
    return useBaseSnapShot(store) as T;
}
