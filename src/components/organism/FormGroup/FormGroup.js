import FormInput from "@/components/molecules/FormInput/FormInput";

export default function FormGroup({ judul1, judul2, hc1, hc2 }){

    return (
        <div className="mx-10">
            <FormInput judulInput={judul1} handleChange={hc1} />
            <br/>
            <FormInput judulInput={judul2} handleChange={hc2} />
        </div>
    )
}