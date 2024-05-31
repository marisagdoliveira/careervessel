import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";




const ObjectId = mongoose.Types.ObjectId; // Esta linha está aqui a fazer o quê ao certo?? -> "it's value is never read"

export async function GET(req) {
  try {
    await connectMongoDB();

    const url = new URL(req.url, "http://localhost");
    const params = new URLSearchParams(url.search);
    const userId = params.get("userId");
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

export async function PATCH(req) {
  console.log("test ");
  try {
    await connectMongoDB();
    const body = await req.json();
    const { userId, name, email, password, linkedin, phone, location } = body;

    const getUser = await User.findOne({ _id: userId });
    console.log(getUser);
    console.log(email)
    if (!getUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    if (name) {
      getUser.name = name;
    }
    
    if (email) {
      getUser.email = email;
    }
    
    if (password) {
      getUser.password = password;
    }
    
    if (linkedin) {
      getUser.linkedin = linkedin;
    }
    
    if (phone) {
      getUser.phone = phone;
    }
    
    if (location) {
      getUser.location = location;
    }

    await getUser.save();

    return NextResponse.json({ user: getUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "An error occured while updating the user name." }, { status: 500 });
  }
}



export async function DELETE(req) {
  console.log("test");
  try {
    await connectMongoDB();
    const body = await req.json();
    const { userId, key } = body;

    // Ensure key is a number
    const indexToRemove = Number(key);

    if (isNaN(indexToRemove)) {
      return NextResponse.json({ message: "Invalid key." }, { status: 400 });
    }

    console.log('Request Body:', body);
    console.log('Index to Remove:', indexToRemove);

    const getUser = await User.findOne({ _id: userId });
    if (!getUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    console.log('User Library Before:', getUser.library);

    // Check if the index is within the bounds of the array
    if (indexToRemove < 0 || indexToRemove >= getUser.library.length) {
      return NextResponse.json({ message: "Index out of bounds." }, { status: 400 });
    }

    // Remove the item at the specified index
    const newLibrary = getUser.library.filter((_, index) => index !== indexToRemove);
    getUser.library = newLibrary;

    console.log('User Library After:', getUser.library);

    await getUser.save();

    return NextResponse.json({ user: getUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while updating the user library item." },
      { status: 500 }
    );
  }
}