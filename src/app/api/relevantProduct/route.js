import { pineconeQuery } from '@/ai/vectorDb/query';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request) {
    try {

        
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


export async function POST(request) {
    try {
        const data = await request.json();

        const longtermStoreQuery = await prisma.LongtermReviewStore.findMany({
            where: { user_id: data.user_id },
        });

        console.log(JSON.stringify(longtermStoreQuery))

        const fromvector = await pineconeQuery(JSON.stringify(longtermStoreQuery));

        let produks = [];
        for (const e of fromvector) {
            const produkId = e.metadata?.id_produk?.toString();
            if (produkId) {
                let produk = await prisma.MerchantProduk.findUnique({
                    where: { id: produkId },
                });
                if (produk) {
                    produks.push(produk);
                }
            }
        }
        
        return new Response(JSON.stringify(produks), {
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
