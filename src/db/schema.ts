import { relations, sql } from 'drizzle-orm';
import {
    pgTable,
    timestamp,
    uuid,
    varchar,
    pgEnum,
    json,
} from 'drizzle-orm/pg-core';
import { TCanvasData } from '@/types/index';

const newDate = () => new Date();

export const formStatusEnum = pgEnum('form_status', [
    'PUBLISHED',
    'DRAFT',
    'INACTIVE',
]);

export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    fullName: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().$onUpdate(newDate).notNull(),
});

export const forms = pgTable('forms', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    status: formStatusEnum().default('INACTIVE').notNull(),
    userId: uuid('user_id').references(() => users.id, {
        onDelete: 'cascade',
    }),
    schema: json()
        .$type<TCanvasData[]>()
        .default(sql`'[]'::json`)
        .notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().$onUpdate(newDate).notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
    forms: many(forms),
}));

export const formRelations = relations(forms, ({ one }) => ({
    user: one(users, {
        fields: [forms.userId],
        references: [users.id],
    }),
}));

export type User = Omit<typeof users.$inferSelect, 'password'>;
export type Form = typeof forms.$inferSelect;
