import { generateQuestion, validateQuestion } from '@/ai/generateQuestion/generateAgent';
import { queryVector } from '@/ai/vectorDb/query';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// Function to fetch quiz data
async function fetchQuizModel(quizRoomId) {
    return prisma.quizModel.findFirst({
        where: { id: quizRoomId },
        select: {
            module: {
                select: {
                    id: true,
                    name: true,
                    Subject: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
}

// Function to handle question generation and validation
async function processQuestion(subjectName, moduleName, formatWanted) {
    let question = await generateQuestion(`${subjectName} ${moduleName}`);
    console.log('Generated Question:', question.choices.message);

    let infoKnowledgeBase = await queryVector(`${subjectName.replace(/\s+/g, '')}`, `${moduleName.replace(/\s+/g, '')}`,question.choices[0].message.content)
    console.log('Info Knowledge Base:', infoKnowledgeBase);
    const isValid = await validateQuestion(question.choices[0].message.content, `${infoKnowledgeBase}`, formatWanted);
    console.log('Validation Result:', isValid);

    console.log('Final Question:', isValid);
    return isValid;
}

// Main handler function
export async function GET(request) {
    try {
        const url = new URL(request.url);
        const quizRoomId = url.searchParams.get('quizRoomId'); // Get quizRoomId from query parameters
        const formatWanted = url.searchParams.get('formatWanted');

        if (!quizRoomId) {
            return new Response(JSON.stringify({ error: 'quizRoomId query parameter is required' }), {
                status: 400,
                headers: corsHeaders,
            });
        }

        // Fetch quiz data
        const quizModel = await fetchQuizModel(quizRoomId);

        // Ensure quizModel exists
        if (!quizModel) {
            return new Response(JSON.stringify({ error: 'Quiz not found' }), {
                status: 404,
                headers: corsHeaders,
            });
        }

        const moduleName = quizModel.module.name;
        const subjectName = quizModel.module.Subject.name;

        // Generate and validate the question
        const question = await processQuestion(subjectName, moduleName, formatWanted);

        return new Response(JSON.stringify({ question }), {
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
