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
        const orderBillId = url.searchParams.get('id');

        if (orderBillId) {
            const pengguna = await prisma.orderBill.findUnique({
                where: { id: orderBillId },
            });

            if (pengguna) {
                return new Response(JSON.stringify(pengguna), {
                    status: 200,
                    headers: corsHeaders,
                });
            } else {
                return new Response(JSON.stringify({ error: 'orderBill Not Found' }), {
                    status: 404,
                    headers: corsHeaders,
                });
            }
        } else {
            const pengguna = await prisma.orderBill.findMany();

            return new Response(JSON.stringify(pengguna), {
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

export async function POST(request) {
    try {
        const data = await request.json();
    
        await postOrderBill(data);

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

export async function postOrderBill(data) {
    const billExists = await prisma.bill.findUnique({
        where: { id: data.bill_id },
    });

    const userExists = await prisma.user.findUnique({
        where: { id: data.user_id },
    });

    const merchantProdukExists = await prisma.merchantProduk.findUnique({
        where: { id: data.merchant_produk_id },
    });

    if (!billExists || !userExists || !merchantProdukExists) {
        return new Response(JSON.stringify({ error: 'Invalid bill_id' }), {
            status: 400,
            headers: corsHeaders,
        });
    }

    const pengguna = await prisma.orderBill.create({
        data: {
            bill_id: data.bill_id,
            user_id: data.user_id,
            merchant_produk_id: data.merchant_produk_id,
            qty: data.qty,
            total_price: data.price * data.qty,
            notes: data.notes
        },
    });
}

export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const orderBillId = url.searchParams.get('id');

        if (!orderBillId) {
            return new Response(JSON.stringify({ error: 'Missing id parameter' }), {
                status: 400,
                headers: corsHeaders,
            });
        }

        const deletedRecord = await prisma.orderBill.delete({
            where: { id: orderBillId },
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