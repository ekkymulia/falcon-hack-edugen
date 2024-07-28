import { reviewGeneratedSummaryAgent } from '@/ai/reviewGeneratedSummary/reviewGeneratedSummaryAgent';
import { pineconeStore } from '@/ai/vectorDb/pinecone';
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
        const url = new URL(request.url);
        const merchantId = url.searchParams.get('id');

        if (merchantId) {
            const merchant = await prisma.Merchant.findUnique({
                where: { id: merchantId },
            });

            const merchantProduk = await prisma.MerchantProduk.findMany({
                where: { merchant_id: merchantId },
            });

            const longtermStore = await prisma.LongtermReviewStore.findMany({
                where: { merchant_id: merchantId },
            });

            if (merchantProduk) {
                const responseAISummarizer = await reviewGeneratedSummaryAgent(
                    JSON.stringify(merchantProduk), 
                    JSON.stringify(longtermStore)
                );

                return new Response(JSON.stringify(responseAISummarizer), {
                    status: 200,
                    headers: corsHeaders,
                });
            } else {
                return new Response(JSON.stringify({ error: 'Merchant summary Not Found' }), {
                    status: 404,
                    headers: corsHeaders,
                });
            }
        } else {
            const merchantProduk = await prisma.MerchantProduk.findMany();

            return new Response(JSON.stringify(merchantProduk), {
                status: 200,
                headers: corsHeaders,
            });
        }
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
