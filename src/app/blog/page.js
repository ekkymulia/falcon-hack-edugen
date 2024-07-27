'use client'
import { useAtom } from "jotai";
import { namaSaya } from "../pengguna/penggunaAtom";
import FormInput from "@/components/molecules/FormInput/FormInput";

const createUser = async (nama, password, email) => {
    try {
        const pengguna = await prisma.users.create({
            data: {
                id: generateUUID(), 
                nama: nama,
                email: email,
                password: password
            }
        });
        return pengguna;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};


export default function Blog() {
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        createUser(nama, password, email);
    } 

    return (
        <>
            {nama ? (
                <div>Nama saya {nama}</div>
            ) : (
                <div>Belum ada nama</div>
            )}

            <FormInput judulInput="Nama" handleChange={(e) => setNama(e.target.value)} />
            <FormInput judulInput="Email" handleChange={(e) => setEmail(e.target.value)} />
            <FormInput judulInput="Password" handleChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleClick}>Submit</button>

            <div>Halo ini halaman blog</div>
        </>
    );
}
