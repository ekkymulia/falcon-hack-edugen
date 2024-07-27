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
        const pengguna = await prisma.pengguna.findMany();

        return new Response(JSON.stringify(pengguna), {
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

export async function POST(request) {
    try {
        const data = await request.json();

        // const pengguna = await reviewEvaluatorCrew(data.review);

        const pengguna = await prisma.User.create({
            data: {
                nama: data.nama,
                role_id: "1",
                email: data.email,
                password: data.password,
            },
        });

        return new Response(JSON.stringify(pengguna), {
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