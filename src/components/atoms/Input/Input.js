export default function Input({ value, onchange }){
    return (
        <input type="text" className="text-black" onChange={onchange} />
    )
}