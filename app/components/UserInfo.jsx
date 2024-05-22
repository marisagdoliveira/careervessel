'use client';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const {data: session} = useSession();

  
  return (
    <div className="grid place-items-center h-screen">
      <div className=" flex flex-col shadow-lg p-5 rounded-lg my-6 border-t-4 border-purple-400 gap-4" >
        <div className="font-bold">
            Name: <span>{session?.user?.name}</span>
        </div>
        <div className="font-bold">
            Email: <span>{session?.user?.email}</span>
        </div>
        <button onClick={() => signOut()}
         className="bg-purple-400 py-2 rounded-lg cursor-pointer text-white">Log Out</button>
      </div>
    </div>
  );
}
