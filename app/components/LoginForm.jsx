import Link from "next/link";

export default function LoginForm() {
    return <div className="grid place-items-center h-screen">
        <div>

        
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-purple-400">
            <h1 className="text-xl font-bold my-4">Login</h1>

            <form className="flex flex-col gap-5">
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button className="align-center w-[100px] bg-purple-400 py-2 rounded-lg
                cursor-pointer text-white px-6">Login</button>

                <div className="bg-red-500 text-white rounded-lg p-1">Error message</div>

                <p className="text-sm mt-3 text-right">Don't have an account yet? <Link href={"/register"} className="underline">Register</Link></p>
            </form>
        </div>
        </div>
    </div>
}