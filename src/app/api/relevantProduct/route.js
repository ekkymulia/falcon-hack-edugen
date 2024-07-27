import { pineconeQuery } from '@/ai/vectorDb/query';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export async function POST(request) {
    try {
        const data = await request.json();

        const response = await pineconeQuery(data.question);
        
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: corsHeaders,
        });
    } catch (error) {
        console.error(error);
        
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: corsHeaders,
        });
    }
}
