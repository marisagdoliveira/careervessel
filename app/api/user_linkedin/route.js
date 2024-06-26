import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";


export async function PATCH(req) {
  console.log("test ");
  try {
    await connectMongoDB();
    const body = await req.json();
    const { userId, linkedin } = body

    let getUser = await User.findOne({ _id: userId });
    console.log(getUser.status);
    if (!getUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }


    getUser.linkedin = linkedin;
    await getUser.save();

    return NextResponse.json({ user: getUser.linkedin }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating the user LinkedIn." },
      { status: 500 }
    );
  }
}