'use client'
import { namaSaya } from "@/app/pengguna/penggunaAtom";
import BlogDetailTemplate from "@/components/templates/BlogDetailTemplate/BlogDetailTemplate";
import { useAtomValue } from "jotai";

const Article = [
    {
        id: 1,
        slug: 'indonesia-vs-guinea',
        judul: 'Indonesia VS Guinea',
        deskripsiJudul: 'Indonesia Kalah tapi tetap semangat',
        urlFoto: 'https://asset.kompas.com/crops/XxV0V5IEWHDcVwvybde84SU9xPw=/0x0:900x600/750x500/data/photo/2024/05/02/6633b7a025878.jpg',
        deskripsiFoto: 'Tim Indonesia sedang menyanyikan lagu kebangsaan',
        konten: 'Indoensia pada pertandian lorem ipsum dolor sit amet......'
    }
]

const getArticleData = ( slug ) => {
    let article = Article.find( article => article.slug == slug)
    return article
}

export default function BlogDetail({ params }){

    let { id } = params;
    const nama = useAtomValue(namaSaya);

    return (
        <>
            {nama ? (
                <div>Nama saya {nama}</div>
            ) : (
                <div>Belum ada nama</div>
            )}

        <BlogDetailTemplate article={getArticleData(id)}  />
        </>
    )
}

