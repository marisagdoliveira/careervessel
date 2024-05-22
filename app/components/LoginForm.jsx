"use client";


import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import CVLogo from "../../public/assets/Logo.svg";
import '../../app/globals.css';
import React from 'react';
export default function LoginForm({ handlesSlide }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           const res = await signIn("credentials", {
                email, password, redirect: false,
            })

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }
              
            router.replace("dashboard");

        } catch (error) {
            console.log(error);
        }
    };

    return <div className="grid place-items-center ">
        <div className='flex flex-col items-center justify-center'>



            <CVLogo style={{ width: "150px", height: "150px" }} className="ml-[20px]" />
            <h1 className="text-2xl text-center font-bold my-4 text-gradient">Login</h1>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
                <input onChange={(e) => setEmail(e.target.value)} onClick={e => setError("")} type="text" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} onClick={e => setError("")} type="password" placeholder="Password" />
                <button className="align-center w-[100px] box-gradient py-2 rounded-lg
            cursor-pointer text-white">Login</button>

                {error && (<div className="bg-red-500 text-white rounded-lg p-1">{error}</div>)}

                <p className="text-sm mt-3 text-white text-right">Don't have an account yet? <span onClick={() => handlesSlide()} className="text-gradient text-base cursor-pointer">Register</span></p>
            </form>

        </div>
    </div>
}