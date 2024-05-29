import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";


export async function PATCH(req) {
  console.log("test ");
  try {
    await connectMongoDB();
    const body = await req.json();
    const { userId, object } = body

    let getUser = await User.findOne({ _id: userId });
    console.log(getUser.status);
    if (!getUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }


    getUser.library.push(object)
    await getUser.save();

    return NextResponse.json({ user_library: getUser.library}, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating the user library." },
      { status: 500 }
    );
  }
}