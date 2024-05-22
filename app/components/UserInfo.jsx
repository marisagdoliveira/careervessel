export default function UserInfo() {
  return (
    <div className="grid place-items-center h-screen">
      <div className=" flex flex-col shadow-lg p-5 rounded-lg my-6 border-t-4 border-purple-400 gap-4" >
        <div className="font-bold">
            Name: <span>Jhon Dough</span>
        </div>
        <div className="font-bold">
            Email: <span>Jhon_dough@gmail.com</span>
        </div>
        <button className="bg-purple-400 py-2 rounded-lg cursor-pointer text-white">Log Out</button>
      </div>
    </div>
  );
}
