import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

const ObjectId = mongoose.Types.ObjectId;

export async function POST(req) {
  try {
    await connectMongoDB();
    
    const { userId } = await req.json();
    const getUser = await User.findOne({ _id: userId });

    if (!getUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user: getUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while finding the user." },
      { status: 500 }
    );
  }
}
