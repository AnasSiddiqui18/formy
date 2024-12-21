import { defineConfig } from 'drizzle-kit';
import { env } from '@/lib/env';

export default defineConfig({
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.POSTGRES_URL,
    },
});
