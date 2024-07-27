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

        const reviewEvaluator = await reviewEvaluatorCrew(data.review);

        const review = await prisma.Review.create({
            data: {
                user_id: data.user_id,
                bill_id: data.bill_id,
                message: data.review,
                rating: data.rating,
            },
        });

        for (const [key, value] of Object.entries(reviewEvaluator.hasilEkstrasi)) {
            try {
                const param = JSON.parse(reviewEvaluator.paramObject)[key];
                
                if(!value){
                    continue;
                }

                await prisma.LongtermReviewStore.create({
                    data: {
                        review_id: review.id ?? null,
                        user_id: data.user_id ?? null,
                        merchant_id: data.merchant_id ?? null,
                        bill_id: data.bill_id ?? null,
                        things_longterm_review_store_id: param.id ?? null,
                        things_to_remember: value ?? null,
                    },
                });
            } catch (error) {
                console.error(`Error saving review for key ${key}:`, error);
            }
        }

        return new Response(JSON.stringify(review), {
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