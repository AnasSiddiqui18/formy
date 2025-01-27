'use client';

import { Button } from '@/components/ui/button';
import { User } from '@/db/schema';
import { useRouter } from 'next-nprogress-bar';
import { UserMenu } from './user-menu';

const Header = ({ user }: { user: User | null }) => {
    const router = useRouter();

    return (
        <div className="flex justify-between size-16 w-full px-section_padding border-b border-gray-300 items-center shrink-0 bg-white text-black">
            <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => router.push('/')}
            >
                <h1 className="font-bold text-2xl text-violet-500">Formy</h1>
            </div>

            <div className="flex items-center gap-5">
                {user ? (
                    <UserMenu user={user} />
                ) : (
                    <Button
                        className="text-white mt-2"
                        onClick={() => router.push('/sign-in')}
                    >
                        Get Started
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Header;
