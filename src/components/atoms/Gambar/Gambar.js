export default function Gambar({ urlFoto, altText }){
    return (
        <img src={urlFoto} alt={altText} />
    )
}