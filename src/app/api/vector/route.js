// import { PrismaClient } from '@prisma/client';
import { uploadFile } from '@/ai/vectorDb/llamaparse';
// const prisma = new PrismaClient();

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export async function POST(request) {
    try {
        // const formData = await parseFormData(request);
        const formData = await request.formData()
        const file = formData.get('file');

        if (!file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        // Step 1: Upload the file
        const uploadResponse = await uploadFile(file);
        console.log('Upload Response:', uploadResponse);

        return new Response(JSON.stringify({ upload: uploadResponse }), {
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
