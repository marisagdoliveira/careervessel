import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";



export async function PATCH(req) {
  console.log("test");
  try {
    await connectMongoDB();
    const body = await req.json();
    const { userId, key } = body;

    // Ensure key is a number
    const index = Number(key);
console.log("Joooooooooooooooooooooooooooorge" + key)
    if (isNaN(index)) {
      return NextResponse.json({ message: "Invalid key." }, { status: 400 });
    }

    const getUser = await User.findOne({ _id: userId });
    if (!getUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    console.log("User Library Before:", getUser.library);

    // Check if the index is within the bounds of the array
    if (index < 0 || index >= getUser.library.length) {
      return NextResponse.json(
        { message: "Index out of bounds." },
        { status: 400 }
      );
    }

    // Toggle the 'open' property
    // getUser.library[index].open = !getUser.library[index].open;
    console.log("O INDEX E ")
    console.log(index)
    console.log(getUser.library[0])
    getUser.library[index] = {colors: getUser.library[index].colors, layout: getUser.library[index].layout, objectgpt: getUser.library[index].objectgpt,  open: true}

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