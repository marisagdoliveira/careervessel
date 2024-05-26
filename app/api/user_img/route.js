import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";


export async function PATCH(req) {
  console.log("test ");
  try {
    await connectMongoDB();
    const body = await req.json();
    const { userId, img } = body

    let getUser = await User.findOne({ _id: userId });
    console.log(getUser.status);
    if (!getUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Update the user's location
    getUser.img = img;
    await getUser.save();

    return NextResponse.json({ user: getUser.img }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while updating the user image." },
      { status: 500 }
    );
  }
}