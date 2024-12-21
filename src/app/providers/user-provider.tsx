'use client';

import { User } from '@/db/schema';
import { auth } from '@/lib/auth';
import { ReactNode, createContext, useContext, useState } from 'react';

type userContextType = {
    user: User;
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
    const [user, _] = useState<User>(userPromise);

    return (
        <userContext.Provider value={{ user }}>{children}</userContext.Provider>
    );
}
