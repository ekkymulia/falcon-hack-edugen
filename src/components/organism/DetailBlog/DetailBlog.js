import DetailImage from "@/components/molecules/DetailImage/DetailImage";
import DetailIsi from "@/components/molecules/DetailIsi/DetailIsi";
import DetailKomentar from "@/components/molecules/DetailKomentar/DetailKomentar";
import DetailTitle from "@/components/molecules/DetailTitle/DetailTitle";


export default function DetailBlog({ articleData }){
    let { judul, deskripsiJudul, urlFoto, slug, deskripsiFoto, konten } = articleData;

    return (
        <div className="mx-10">
            <DetailTitle judul={judul} deskripsiJudul={deskripsiJudul} />
            <br></br>
            <DetailImage urlFoto={urlFoto} altText={slug} deskripsiFoto={deskripsiFoto} />
            <br></br>
            <DetailIsi konten={konten}/>
            <br></br>
            <DetailKomentar/>
        </div>
    )
}