'use client'
import Input from "@/components/atoms/Input/Input";
import Paragraf from "@/components/atoms/Paragraf/Paragraf";
import { useEffect, useState } from "react";

export default function DetailKomentar (){
    const [komentar, setKomentar] = useState("Masukan Komentar anda")

    useEffect(() => {
        if(komentar == ""){
            setKomentar("Masukan Komentar anda (dari useeffect)")
        }
    }, [komentar])

    return (
        <>
            <Paragraf value={komentar} style="text-2xl font-bold" />

            <br></br>

            <Input value={komentar} onchange={(e) => setKomentar(e.target.value)} />
        </>
    )
}