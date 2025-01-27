'use client';

import { generateCodeFromCanvasData } from '@/components/codebox/generate-code-from-canvas-data';
import { Button } from '@/components/ui/button';
import { useSnapshot } from '@/hooks/use-snapshot';
import { showToast } from '@/lib/utils';
import { store } from '@/store';
import { Highlight, themes } from 'prism-react-renderer';

export function CodeBox() {
    const { canvasData } = useSnapshot(store);
    const result = generateCodeFromCanvasData(canvasData);

    return (
        <div className="h-full relative">
            <div className="absolute top-2 right-6">
                <Button
                    className="bg-violet-500 hover:bg-violet-600 text-white"
                    onClick={() => {
                        navigator.clipboard.writeText(result);
                        return showToast({
                            variant: 'success',
                            message: 'Copied!',
                        });
                    }}
                >
                    Copy
                </Button>
            </div>

            <Highlight code={result} language="tsx" theme={themes.nightOwl}>
                {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                }) => (
                    <pre
                        className={`${className} p-4 text-sm bg-gray-100 rounded-lg overflow-auto h-full`}
                        style={style}
                    >
                        {tokens.map((line, i: number) => (
                            <div key={i} {...getLineProps({ line })}>
                                {line.map((token, index) => (
                                    <span
                                        key={index}
                                        {...getTokenProps({ token })}
                                    />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    );
}
