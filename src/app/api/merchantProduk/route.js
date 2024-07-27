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
        const merchantProdukId = url.searchParams.get('id');

        if (merchantProdukId) {
            const merchantProduk = await prisma.merchantProduk.findUnique({
                where: { id: merchantProdukId },
            });

            if (merchantProduk) {
                return new Response(JSON.stringify(merchantProduk), {
                    status: 200,
                    headers: corsHeaders,
                });
            } else {
                return new Response(JSON.stringify({ error: 'merchantProduk Not Found' }), {
                    status: 404,
                    headers: corsHeaders,
                });
            }
        } else {
            const merchantProduk = await prisma.merchantProduk.findMany();

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

export async function POST(request) {
    try {
        const data = await request.json();

        const merchantExists = await prisma.merchant.findUnique({
            where: { id: data.merchant_id },
        });

        if (!merchantExists) {
            return new Response(JSON.stringify({ error: 'Invalid merchant_id' }), {
                status: 400,
                headers: corsHeaders,
            });
        }

        const merchantProduk = await prisma.merchantProduk.create({
            data: {
                merchant_id: data.merchant_id,
                nama: data.nama,
                gambar: data.gambar,
                deskripsi: data.deskripsi,
                qty: data.qty,
                price: data.price,
                discount: data.discount,
            },
        });

        return new Response(JSON.stringify(merchantProduk), {
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
        const merchantProdukId = url.searchParams.get('id');

        if (!merchantProdukId) {
            return new Response(JSON.stringify({ error: 'Missing id parameter' }), {
                status: 400,
                headers: corsHeaders,
            });
        }

        const deletedRecord = await prisma.merchantProduk.delete({
            where: { id: merchantProdukId },
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