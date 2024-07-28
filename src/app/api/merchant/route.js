import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const merchantId = url.searchParams.get('id');

        if (merchantId) {
            const merchant = await prisma.merchant.findUnique({
                where: { id: merchantId },
            });

            if (merchant) {
                return new Response(JSON.stringify(merchant), {
                    status: 200,
                    headers: corsHeaders,
                });
            } else {
                return new Response(JSON.stringify({ error: 'Merchant Not Found' }), {
                    status: 404,
                    headers: corsHeaders,
                });
            }
        } else {
            const merchant = await prisma.merchant.findMany();

            return new Response(JSON.stringify(merchant), {
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

        const user = await prisma.user.create({
            data: {
                nama: data.nama_user,
                role_id: "2",
                email: data.email,
                password: data.password,
            },
        });

        const merchant = await prisma.merchant.create({
            data: {
                user_id: user.id,
                nama: data.nama_merchant,
                alamat: data.alamat,
                gambar: data.gambar,
                provinsi_id: data.provinsi_id,
                kota_id: data.kota_id,
                kecamatan_id: data.kecamatan_id,
                kelurahan_id: data.kelurahan_id,
                longitude: data.longitude,
                latitude: data.latitude,
                no_telp: data.no_telp,
                email_verified: data.email_verified,
                tipe_bisnis: data.tipe_bisnis,
                rata_rata_penjualan: data.rata_rata_penjualan,
                jenis_perangkat: data.jenis_perangkat,
            },
        });

        return new Response(JSON.stringify(merchant), {
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
        const merchantId = url.searchParams.get('id');

        if (!merchantId) {
            return new Response(JSON.stringify({ error: 'Missing id parameter' }), {
                status: 400,
                headers: corsHeaders,
            });
        }

        const deletedMerchant = await prisma.merchant.delete({
            where: { id: merchantId },
        });

        return new Response(JSON.stringify(deletedMerchant), {
            status: 200,
            headers: corsHeaders,
        });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return new Response(JSON.stringify({ error: 'Merchant Not Found' }), {
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