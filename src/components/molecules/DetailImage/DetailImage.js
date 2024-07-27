import Gambar from "@/components/atoms/Gambar/Gambar";
import Paragraf from "@/components/atoms/Paragraf/Paragraf";

export default function DetailImage({ urlFoto, altText, deskripsiFoto }){
    return (
        <>
            <Gambar urlFoto={urlFoto} altText={altText}  />
            <Paragraf value={deskripsiFoto} style="text-slate-500 text-md italic" />
        </>
    )
}