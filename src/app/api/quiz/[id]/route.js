import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

async function fetchQuizzes(quizRoomId) {
    return await prisma.quizModel.findMany({
        where: { quizRoomId },
        include: {
            module: true, // Include related module details if needed
            questions: true, // Include related questions if needed
        }
    });
}

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const quizRoomId = url.searchParams.get('quizRoomId'); // Get quizRoomId from query parameters

        if (!quizRoomId) {
            return new Response(JSON.stringify({ error: 'quizRoomId query parameter is required' }), {
                status: 400,
                headers: corsHeaders,
            });
        }

        // Fetch quiz data
        const quizzes = await fetchQuizzes(quizRoomId);

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
