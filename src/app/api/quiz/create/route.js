import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

async function createQuizRoom(data) {
    const { name, roomCode, quizzes } = data;

    return await prisma.quizRoom.create({
        data: {
            name,
            roomCode,
            quizzes: {
                create: quizzes.map(quiz => ({
                    moduleId: quiz.moduleId,
                    choiceQuestion: parseInt(quiz.choiceQuestion, 10),
                    essayQuestion: parseInt(quiz.essayQuestion, 10),
                })),
            },
        },
        include: {
            quizzes: true,
        },
    });
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Create a quiz room with the received data
        const quizRoom = await createQuizRoom(body);

        return new Response(JSON.stringify({ quizRoom }), {
            status: 201,
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
