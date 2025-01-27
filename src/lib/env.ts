import { createEnv } from '@t3-oss/env-nextjs';
import 'dotenv/config';
import { z } from 'zod';

export const env = createEnv({
    server: {
        POSTGRES_URL: z.string().url(),
        JWT_SECRET: z.string(),
        APP_SECRET: z.string(),
        SENDER_EMAIL: z.string(),
    },

    client: {
        NEXT_PUBLIC_PORT: z.string(),
    },

    runtimeEnv: {
        JWT_SECRET: process.env.JWT_SECRET,
        POSTGRES_URL: process.env.POSTGRES_URL,
        NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
        APP_SECRET: process.env.APP_SECRET,
        SENDER_EMAIL: process.env.SENDER_EMAIL,
    },
});
