'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();

    return (
        <div className="bg-white min-h-view text-black grid-bg flex items-center justify-center relative">
            <div
                className="absolute -bottom-3 right-0 left-0 h-20 w-full rounded-full blur-3xl"
                style={{
                    background:
                        'radial-gradient(circle, rgba(128,90,213,0.7) 0%, rgba(186,104,200,0.4) 100%, rgba(255,255,255,0) 100%)',
                }}
            ></div>

            <div className="text-center flex flex-col items-center gap-2 max-w-2xl h-full justify-center">
                <motion.h2
                    className="text-5xl font-bold mb-5 relative text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 100 }}
                    transition={{ duration: 0.2, ease: 'easeIn' }}
                >
                    Create Forms in Minutes
                    <br />
                    <span className="text-violet-500 relative">
                        Share in a Click
                        <div className="absolute top-5 -right-8">
                            <Image
                                src="cursor.svg"
                                alt="no-img"
                                width={60}
                                height={60}
                                className="-rotate-12"
                            />
                        </div>
                    </span>
                </motion.h2>

                <p className="text-xl text-gray-600">
                    Build, publish, and share your forms instantly. Gather
                    responses effortlessly and turn data into actionable
                    insights.
                </p>
                <Button
                    className="bg-violet-500 text-white mt-2 hover:bg-violet-600"
                    onClick={() => router.push('/dashboard')}
                >
                    Get Started
                </Button>
            </div>
        </div>
    );
}
