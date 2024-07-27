import Headings from "@/components/atoms/Headings/Headings";
import Paragraf from "@/components/atoms/Paragraf/Paragraf";

export default function DetailTitle({ judul, deskripsiJudul }){
    return (
        <>
            <Headings ukuran="H1" value={ judul } />
            <Paragraf style="text-2xl" value={ deskripsiJudul } />
        </>
    )
}