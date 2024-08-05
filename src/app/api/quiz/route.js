import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

async function fetchQuizzes() {
    const quizzes = await prisma.quizModel.findMany({
        include: {
            module: {
                include: {
                    file: true, // Include file details if needed
                }
            },
            quizRoom: true, // Include the associated quiz room
        }
    });

    // Filter quizzes to only include one per unique quizRoom id
    const uniqueQuizzes = [];
    const seenRoomIds = new Set();

    for (const quiz of quizzes) {
        if (!seenRoomIds.has(quiz.quizRoom.id)) {
            uniqueQuizzes.push(quiz);
            seenRoomIds.add(quiz.quizRoom.id);
        }
    }

    return uniqueQuizzes;
}


export async function GET(request) {
    try {
        // Fetch quiz data
        const quizzes = await fetchQuizzes();

        return new Response(JSON.stringify({ quizzes }), {
            status: 200,
            headers: corsHeaders,
        });

    } catch (error) {
        console.error('Internal Server Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: corsHeaders,
        });
    }
}
