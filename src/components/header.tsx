'use client';

import { UserMenu } from './user-menu';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { User } from '@/db/schema';

// type inferData<T> = NonNullable<Awaited<ReturnType<T>>>;

// type userT = inferData<typeof auth.getUser>;

const Header = ({ user }: { user: User }) => {
    const router = useRouter();

    return (
        <div className="flex justify-between size-16 w-full px-12 border-b border-gray-300 items-center shrink-0 bg-white text-black">
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
                        className="bg-violet-500 text-white mt-2 hover:bg-violet-600"
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
