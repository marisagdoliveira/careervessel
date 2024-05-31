import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";



export async function PATCH(req) {
  console.log("test");
  try {
    await connectMongoDB();
    const body = await req.json();
    const { userId } = body;

    // Ensure key is a number
    

    const getUser = await User.findOne({ _id: userId });
    if (!getUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }


    getUser.library.forEach((item, index) => {
        getUser.library[index].open = false;
      });
    

    await getUser.save();

    console.log("User Library After:", getUser.library);

    return NextResponse.json({ user: getUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while updating the open property." },
      { status: 500 }
    );
  }
}