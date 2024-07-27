'use client'
import { useAtom } from "jotai";
import { namaSaya } from "../pengguna/penggunaAtom";
import FormInput from "@/components/molecules/FormInput/FormInput";

export default function Blog() {
    const [nama, setNama] = useAtom(namaSaya);

    return (
        <>
            {nama ? (
                <div>Nama saya {nama}</div>
            ) : (
                <div>Belum ada nama</div>
            )}

            <FormInput judulInput="Nama" handleChange={(e) => setNama(e.target.value)} />

            <div>Halo ini halaman blog</div>
        </>
    );
}
