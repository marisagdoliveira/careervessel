import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs"
import { getURL } from "next/dist/shared/lib/utils";



export async function PATCH(req) {
  console.log("test ");
  try {
    await connectMongoDB();

    const body = await req.json();
    const { userId, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10); // encrypting new password before updating
    const getUser = await User.findOne({ _id: userId });
    console.log(getUser.status);
    if (!getUser) {
      return NextResponse.json({ message: "User not found." }, { status: 201 });
    }
    getUser.password = hashedPassword;
    await getUser.save();

    return NextResponse.json({ user: getUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "An error occured while updating the user password." }, { status: 500 });
  }
}

