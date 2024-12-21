import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { env } from '@/lib/env';

export const db = drizzle(env.POSTGRES_URL, {
    schema,
});
