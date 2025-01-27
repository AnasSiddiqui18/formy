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
                    // ! remove this div before commiting (Notification Feat)

                    // <div className="flex items-center gap-7">
                    //     <Popover>
                    //         <PopoverTrigger asChild>
                    //             <div className="relative">
                    //                 <BellIcon size={30} />
                    //                 <div className="absolute -top-1 right-0 size-3 rounded-full bg-red-500"></div>
                    //             </div>
                    //         </PopoverTrigger>
                    //         <PopoverContent className="w-80 mr-32 h-60">
                    //             <div className="flex items-center justify-center h-full">
                    //                 <div className="flex flex-col items-center gap-3">
                    //                     <MailX size={40} className='text-primary' />
                    //                     <span className="text-gray-400">
                    //                         No Messages...
                    //                     </span>
                    //                 </div>
                    //             </div>
                    //         </PopoverContent>
                    //     </Popover>
                    // </div>
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
