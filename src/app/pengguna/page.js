'use client'
import PenggunaTemplate from "@/components/templates/PenggunaTemplate/PenggunaTemplate";
import axios from "axios";

import { useEffect, useState } from "react";

const postPengguna = async (data) => {
    const response = await fetch("/api/pengguna", {
        method: "POST",
        body: JSON.stringify(data),
    });

    return response.json();
}

export const apiAxios = axios.create({
    baseURL: `http://127.0.0.1:3000/api`
})

const getPengguna = async () => {
    const response = await apiAxios.get("/pengguna");
    return response.data;
}


export default function Pengguna(){

    const [namaDepan, setNamaDepan] = useState("")
    const [namaBelakang, setNamaBelakang] = useState("")
    const [pengguna, setPengguna] = useState([])

    const handleNamaDepan = (e) => setNamaDepan(e.target.value)
    const handleNamaBelakang = (e) => setNamaBelakang(e.target.value) 
    const handleClick = (e) => postPengguna({ nama_depan: namaDepan, nama_belakang: namaBelakang })
    
    useEffect(() => {
        getPengguna().then(data => setPengguna(data))
    }, [pengguna])

    return (
        <>
            <PenggunaTemplate pengguna={pengguna} judul1="Nama Depan" judul2="Nama Belakang" hc1={handleNamaDepan} hc2={handleNamaBelakang}
                hc3={handleClick}
            />
        </>
    )
}