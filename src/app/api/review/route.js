import { PrismaClient } from '@prisma/client'
import { reviewEvaluatorCrew } from "@/ai/reviewEvaluatorCrew/crew";

const prisma = new PrismaClient();

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export async function POST(request) {
    try {
        const data = await request.json();
        const orderBill = await prisma.orderBill.findMany({
            where: {
              bill_id: data.bill_id,
            },
        });

        let produk = [];
        const reviewPromises = orderBill.map(async (element) => {
          return await prisma.merchantProduk.findFirst({
            where: {
              id: element.merchant_produk_id,
            },
          });
        });
        
        produk = await Promise.all(reviewPromises);

        const reviewEvaluator = await reviewEvaluatorCrew(data.message, produk);

        const review = await prisma.Review.create({
            data: {
                user_id: data.user_id,
                bill_id: data.bill_id,
                message: data.message,
                rating: data.rating,
            },
        });

        for (const [key, value] of Object.entries(reviewEvaluator.hasilEkstrasi)) {
            try {

                if(!value){
                    continue;
                }

                await prisma.LongtermReviewStore.create({
                    data: {
                        review_id: review.id ?? null,
                        user_id: data.user_id ?? null,
                        merchant_id: data.merchant_id ?? null,
                        bill_id: data.bill_id ?? null,
                        category: value[0] ?? null,
                        things_to_remember: value[1] ?? null,
                    },
                });
            } catch (error) {
                console.error(`Error saving review for key ${key}:`, error);
            }
        }

        return new Response(JSON.stringify(produk), {
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