'use client';
import React from 'react';
import Link from "next/link";
import { useState } from "react";
import CVLogo from "../../public/assets/Logo.svg";
import '../../app/globals.css';
import { useRouter } from 'next/navigation';

export default function RegisterForm({ handlesSlide }){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

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
            form.reset();
            router.push('/');
            handlesSlide()
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

    return <div className="grid place-items-center">

        <div className='flex flex-col items-center justify-center'>
            <CVLogo style={{ width: "150px", height: "150px" }} className="ml-[20px]" />
            <h1 className="text-2xl text-center font-bold my-4 text-gradient">Register</h1>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
                <input onChange={e => setName(e.target.value)} onClick={e => setError("")} type="text" placeholder="Full Name" />
                <input onChange={e => setEmail(e.target.value)} onClick={e => setError("")} type="text" placeholder="Email" />
                <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                <button className="align-center w-[100px] box-gradient py-2 rounded-lg
            cursor-pointer text-white">Submit</button>



                {error && (
                    <div className="bg-red-500 text-white rounded-lg p-1">{error}</div>
                )}


                <p className="text-sm mt-3 text-right text-white">Already have an account? <span onClick={() => handlesSlide()} className="text-gradient text-base cursor-pointer">Login</span></p>
            </form>
        </div>

    </div>
}