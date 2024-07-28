import { PrismaClient } from '@prisma/client'
import { UUID } from 'mongodb';

const prisma = new PrismaClient();

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};


export async function GET(request) {
    try {
        const response = await fetchReviewParameter(request);

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
    } finally {
        await prisma.$disconnect();
    }
}

export async function fetchReviewParameter(request) {
    try {
        const response = await prisma.ThingsLongtermReviewStore.findMany();

        return response;
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request) {
    try {
        const data = await request.json();

        const response = await prisma.ThingsLongtermReviewStore.create({
            data: {
                nama: data.nama,
            },
        });

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
    } finally {
        await prisma.$disconnect();
    }
}