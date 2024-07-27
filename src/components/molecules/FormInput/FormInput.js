'use client'
import Input from "@/components/atoms/Input/Input";
import Paragraf from "@/components/atoms/Paragraf/Paragraf";
import { useEffect, useState } from "react";

export default function FormInput ({ judulInput, handleChange }){
    return (
        <>
            <Paragraf value={judulInput} style="text-2xl font-bold" />
            <br></br>
            <Input value="" onchange={handleChange} />
        </>
    )
}