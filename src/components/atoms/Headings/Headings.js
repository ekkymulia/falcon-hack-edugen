const HeadingsValue = {
    H1: 'text-4xl',
    H2: 'text-3xl'
}

export default function Headings({ ukuran, value }){


    return (
        <h1 className={HeadingsValue[ukuran]} >{value}</h1>
    )
}