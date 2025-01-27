import { TriangleAlert } from 'lucide-react';

export function ErrorWrapper({ error }: { error: React.ReactNode }) {
    return (
        <div className="mx-auto flex h-full max-w-xs flex-col items-center justify-center gap-2 py-20 text-center text-accent-foreground">
            <TriangleAlert size={50} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
                {error}
            </span>
        </div>
    );
}
