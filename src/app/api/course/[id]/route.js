import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

async function fetchCourses() {
    return await prisma.subject.findMany({
        include: {
            modules: {
                include: {
                    file: true,
                    QuizModel: true,
                }
            }
        }
    });
}

export async function GET(request) {
    try {
        // Fetch course data
        const courses = await fetchCourses();

        return new Response(JSON.stringify({ courses }), {
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
