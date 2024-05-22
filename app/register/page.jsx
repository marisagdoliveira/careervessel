import RegisterForm from "../components/registerForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function Register() {
    const session = await getServerSession(authOptions);

    if (session) redirect("/dashboard");
    
    return <div className="grid place-items-center h-screen bg-zinc-800"><RegisterForm /></div>
}