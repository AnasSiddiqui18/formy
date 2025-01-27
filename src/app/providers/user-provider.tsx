'use client';

import { User } from '@/db/schema';
import { auth } from '@/lib/auth';
import { ReactNode, createContext, useContext } from 'react';

type userContextType = {
    user: User | null;
};

type userT = NonNullable<Awaited<ReturnType<typeof auth.getUser>>>;

const userContext = createContext<userContextType | null>(null);

export const useUser = () => useContext(userContext) as userContextType;

export function UserProvider({
    children,
    userPromise,
}: {
    children: ReactNode;
    userPromise: userT;
}) {
    return (
        <userContext.Provider value={{ user: userPromise.data }}>
            {children}
        </userContext.Provider>
    );
}
