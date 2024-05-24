import Link from "next/link";
import UserInfo from "../components/UserInfo";


export default function Dashboard() {
    return (
    
    <div>
        <Link href="/generator"><button>Generate</button></Link>
        <UserInfo />
        </div>)
}