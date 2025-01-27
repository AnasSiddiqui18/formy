import { TCanvasData } from '@/types';

export function generateImportsCode(content: TCanvasData[]) {
    const importSet = new Set(['import { Form } from "./ui/form"']);

    for (const element of content) {
        if (element.type === 'input') {
            importSet.add("import { useForm } from 'react-hook-form';");
            importSet.add(
                "import { zodResolver } from '@hookform/resolvers/zod'",
            );
        }

        if (element.type === 'button') {
            importSet.add("import { cn } from '@/lib/utils';");
        }
    }

    const imports = Array.from(importSet).join('\n');
    return imports;
}
