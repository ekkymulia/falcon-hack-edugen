import FormGroup from "@/components/organism/FormGroup/FormGroup";

export default function PenggunaTemplate({ pengguna, judul1, judul2, hc1, hc2, hc3 }){
    return (
       <>
            {
                pengguna ? (
                   pengguna.map((data, index) => (
                        <div key={index}>
                            <h1>{data.nama_depan}</h1>
                            <h1>{data.nama_belakang}</h1>
                        </div>
                    ))
                ) : (
                    <h1>Article tidak ada</h1>
                )
            }

            <FormGroup judul1={judul1} judul2={judul2} hc1={hc1} hc2={hc2} />

            <button onClick={hc3} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>
       </>
    )
}