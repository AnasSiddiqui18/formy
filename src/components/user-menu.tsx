'use client';

import { LogOut } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { logOut } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { Avatar } from './ui/avatar';
import { User } from '@/db/schema';
import { getInitials } from '@/lib/utils';

export function UserMenu({ user }: { user: Omit<User, 'password'> }) {
    const router = useRouter();

    async function handleLogOut() {
        const response = await logOut();
        console.log('user logout successfully', response);

        if (response?.success) {
            return router.replace('/sign-in');
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="rounded-full bg-violet-600 hover:bg-violet-700 flex justify-center items-center font-semibold cursor-pointer text-white">
                    {getInitials(user.fullName)}
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={handleLogOut}
                >
                    <LogOut />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
