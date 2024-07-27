import { PrismaClient } from '@prisma/client';
import { postOrderBill } from '../orderBill/route.js';

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
        
        const { user_id, merchant_id, subtotal, delivery_price, total_bill, notes, delivery_option_id, orderBills } = data;
        const status = "pending";

        // Validate orderBills array
        if (!Array.isArray(orderBills) || orderBills.length === 0) {
            return new Response(JSON.stringify({ error: 'No orderBills data provided' }), {
                status: 400,
                headers: corsHeaders,
            });
        }

        // Validate user and merchant
        const userExists = await prisma.user.findUnique({ where: { id: user_id } });
        const merchantExists = await prisma.merchant.findUnique({ where: { id: merchant_id } });

        if (!userExists) {
            return new Response(JSON.stringify({ error: 'Invalid user' }), {
                status: 400,
                headers: corsHeaders,
            });
        }

        if (!merchantExists) {
            return new Response(JSON.stringify({ error: 'Invalid product merchant' }), {
                status: 400,
                headers: corsHeaders,
            });
        }

        // Create the bill
        const bill = await prisma.bill.create({
            data: {
                user_id,
                merchant_id,
                subtotal,
                delivery_price,
                total_bill,
                notes,
                delivery_option_id,
                status
            },
        });

        const orderBillData = {
            bill_id: bill.id,
            user_id:bill.user_id,
            merchant_produk_id:orderBills.merchant_produk_id,
            qty:orderBills.qty,
            total_price:orderBills.price,
            notes:orderBills.notes
        };
    

        await postOrderBill(orderBillData);

        return new Response(JSON.stringify({ bill, orderBills: createdOrderBills }), {
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


export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const billId = url.searchParams.get('id');

        if (!billId) {
            return new Response(JSON.stringify({ error: 'Missing id parameter' }), {
                status: 400,
                headers: corsHeaders,
            });
        }

        const deletedRecord = await prisma.bill.delete({
            where: { id: billId },
        });

        return new Response(JSON.stringify(deletedRecord), {
            status: 200,
            headers: corsHeaders,
        });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return new Response(JSON.stringify({ error: 'Record Not Found' }), {
                status: 404,
                headers: corsHeaders,
            });
        }
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: corsHeaders,
        });
    } finally {
        await prisma.$disconnect();
    }
}
