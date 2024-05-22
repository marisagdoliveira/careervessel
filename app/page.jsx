
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import HomePage from "./components/HomePage";


export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <main className="bg-zinc-700 overflow-hidden">
      <HomePage />
      
    </main>
  );
}
