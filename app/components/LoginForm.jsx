"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; 

export default function LoginForm() {

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
                setError("Invalid Credentials.");
                return;
            }
              
            router.replace("dashboard");

        } catch (error) {
            console.log(error);
        }
    };

    return <div className="grid place-items-center h-screen">
        <div>

        
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-purple-400">
            <h1 className="text-xl font-bold my-4">Login</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email"/>
                <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"/>
                <button className="align-center w-[100px] bg-purple-400 py-2 rounded-lg
                cursor-pointer text-white px-6">Login</button>
                {error && (
                <div className="bg-red-500 text-white rounded-lg p-1">{error}</div>

                )}

                

                <p className="text-sm mt-3 text-right">Don't have an account yet? <Link href={"/register"} className="underline">Register</Link></p>
            </form>
        </div>
        </div>
    </div>
}