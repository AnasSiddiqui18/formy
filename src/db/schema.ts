import { TCanvasData } from '@/types/index';
import { relations } from 'drizzle-orm';
import {
    boolean,
    index,
    jsonb,
    pgEnum,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

const newDate = () => new Date();

export const formStatusEnum = pgEnum('form_status', ['PUBLISHED', 'DRAFT']);

export const users = pgTable(
    'users',
    {
        id: uuid().primaryKey().defaultRandom(),
        full_name: varchar({ length: 255 }).notNull(),
        email: varchar({ length: 255 }).notNull(),
        password: varchar({ length: 255 }).notNull(),
        email_verified: boolean().default(false).notNull(),
        created_at: timestamp().defaultNow().notNull(),
        updated_at: timestamp().defaultNow().$onUpdate(newDate).notNull(),
    },
    (table) => [index('email_index').on(table.email)],
);

export const forms = pgTable(
    'forms',
    {
        id: uuid().primaryKey().defaultRandom(),
        title: varchar({ length: 255 }).notNull(),
        status: formStatusEnum().default('DRAFT').notNull(),
        user_id: uuid('user_id').references(() => users.id, {
            onDelete: 'cascade',
        }),
        schema: jsonb().$type<TCanvasData[]>().default([]).notNull(),
        created_at: timestamp().defaultNow().notNull(),
        updated_at: timestamp().defaultNow().$onUpdate(newDate).notNull(),
    },
    (table) => [index('creator_index').on(table.user_id)],
);

export const formResponses = pgTable(
    'forms_responses',
    {
        id: uuid().primaryKey().defaultRandom(),
        form_id: uuid('form_id')
            .references(() => forms.id, {
                onDelete: 'cascade',
            })
            .notNull(),
        respondent_id: uuid('respondent_id')
            .references(() => users.id, {
                onDelete: 'cascade',
            })
            .notNull(),
        content: jsonb().$type<Record<string, string>>().default({}).notNull(),
        created_at: timestamp().defaultNow().notNull(),
        updated_at: timestamp().defaultNow().$onUpdate(newDate).notNull(),
    },

    (table) => [
        index().on(table.form_id),
        // uniqueIndex().on(table.respondent_id, table.form_id), //! TODO add this later
    ],
);

export const userRelations = relations(users, ({ many, one }) => ({
    forms: many(forms),
    forms_responses: one(formResponses),
}));

export const formRelations = relations(forms, ({ one, many }) => ({
    user: one(users, {
        fields: [forms.user_id],
        references: [users.id],
    }),
    responses: many(formResponses),
}));

export const formResponseRelation = relations(formResponses, ({ one }) => ({
    form: one(forms, {
        fields: [formResponses.form_id],
        references: [forms.id],
    }),

    user: one(users, {
        fields: [formResponses.respondent_id],
        references: [users.id],
    }),
}));

export type User = Omit<
    typeof users.$inferSelect,
    'password' | 'email_verified'
>;
export type Form = typeof forms.$inferSelect;
export type FormResponses = typeof formResponses.$inferSelect;
