import { Search } from 'lucide-react';
import { Input } from './ui/input';

export function SearchBar() {
    return (
        <div className="flex items-center bg-gray-300 px-2 rounded-md">
            <Input
                className="focus-visible:ring-0 border-none text-gray-500"
                placeholder="Search Components"
            />
            <Search className="text-gray-500" />
        </div>
    );
}
