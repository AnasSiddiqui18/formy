import { TCanvasData } from '@/types';

export function generateFormFieldsCode(canvasData: TCanvasData[]) {
    const chunks: string[] = [];

    for (const element of canvasData) {
        if (element.type === 'heading') {
            chunks.push(`
                <div className="flex justify-center mb-4">
                    <h1 className="font-semibold text-2xl">
                        ${element.content}
                    </h1>
                </div>
            `);
        }

        if (element.type === 'input') {
            chunks.push(`
                <FormField
                    control={form.control}
                    name=${element.fieldName}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm">${element.content}</FormLabel>
                            <FormControl>
                                <Input placeholder="${element.placeHolder}" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />`);
        }

        if (element.type === 'description') {
            chunks.push(`<p key=${element.id}>${element.content}</p>`);
        }

        if (element.type === 'button') {
            chunks.push(`   
                <Button
                    key={field.id}
                    className={cn(
                        'bg-blue-500 hover:bg-blue-600 text-white',
                        {
                            roboto: field.font === 'Roboto',
                        },
                    )}
                    type="submit">                
                    ${element.content}
                </Button>
            `);
        }
    }

    return chunks.join('\n');
}
