import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export const env = createEnv({
    server: {
        POSTGRES_URL: z.string().url(),
        JWT_SECRET: z.string(),
    },

    experimental__runtimeEnv: {
        JWT_SECRET: process.env.JWT_SECRET,
        POSTGRES_URL: process.env.POSTGRES_URL,
    },
});
