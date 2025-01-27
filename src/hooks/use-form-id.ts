import { usePathname } from 'next/navigation';

export function useFormId() {
    const response = usePathname();
    const formID = response.split('/')[2];
    return formID;
}
