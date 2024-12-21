import { db } from '@/db';
import { forms, users } from '@/db/schema';
import argon2 from 'argon2';

async function main() {
    try {
        const hashedPassword = await argon2.hash('password123');

        const newUser: Omit<
            typeof users.$inferSelect,
            'id' | 'createdAt' | 'updatedAt'
        > = {
            fullName: 'john doe',
            email: 'johndoe2@gmail.com',
            password: hashedPassword,
        };

        const response = await db.insert(users).values(newUser).returning();

        const newForm: Omit<
            typeof forms.$inferSelect,
            'id' | 'createdAt' | 'updatedAt'
        > = {
            title: 'Feedback form',
            userId: response[0].id,
            isPublished: false,
        };

        const formResponse = await db.insert(forms).values(newForm).returning();
        console.log('data seeded successfully', formResponse);
    } catch (error) {
        console.log('error while seeding the database', error);
    }
}

main();
