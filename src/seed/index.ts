import { db } from '@/db';
import { formResponses } from '@/db/schema';
import { subDays } from 'date-fns';

async function main() {
    const users = [
        {
            username: 'new response',
            respondent_id: '79d73829-89de-49fb-a735-9e5b9d28cacb',
            form_id: '0c92f2c7-9ac4-471a-8da3-edfe65c2e318',
        },
    ];

    const subdays = subDays(new Date(), 2);

    users.forEach(async (user) => {
        await db
            .insert(formResponses)
            .values({
                content: {
                    name: user.username,
                },
                form_id: user.form_id,
                respondent_id: user.respondent_id,
                created_at: subdays,
            })
            .returning();
    });
}

main();
