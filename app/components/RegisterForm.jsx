'use client';

import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are necessary.");
            return;
      }


      try {
        const resUserExists = await fetch('api/userExists', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        
        const { user } = await resUserExists.json();

        if (user) {
            setError("User already exists.");
            return;
        }

        const res = await fetch('api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        });

        if (res.ok) {
            const form = e.target;
            form.reset()
        } else {
            console.log("User registration failed.");
        }
        
      } catch (error) {
        console.log("Error during registration.", error)
        
      }
    };

            //console.log("Name: ", name);
            //console.log("Email: ", email);
            //console.log("Password: ", password);
            // everything is ok!!

    return <div className="grid place-items-center h-screen">
    <div className="shadow-lg p-5 rounded-lg border-t-4 border-purple-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input onChange={e => setName(e.target.value)} type="text" placeholder="Full Name"/>
            <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email"/>
            <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"/>
            <button className="align-center w-[100px] bg-purple-400 py-2 rounded-lg
            cursor-pointer text-white">Register</button>



            { error && (
                <div className="bg-red-500 text-white rounded-lg p-1">{error}</div>
            )}
            

            <p className="text-sm mt-3 text-right">Already have an account? <Link href={"/"} className="underline">Login</Link></p>
        </form>
    </div>
</div>
}