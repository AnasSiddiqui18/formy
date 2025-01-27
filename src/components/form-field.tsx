import { Input } from './ui/input';
import { Label } from './ui/label';

type FormFieldProps = {
    label: string;
    value: string;
    fn: (value: string) => void;
    placeholder: string;
};

export function FormField({ label, value, fn, placeholder }: FormFieldProps) {
    return (
        <div>
            <Label className="text-gray-400">{label}</Label>
            <Input
                className="focus-visible:ring-0 mb-3 text-gray-500 border border-gray-300"
                value={value}
                onChange={(e) => fn(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}
