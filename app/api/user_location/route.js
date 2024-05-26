import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";






export async function PATCH(req) {
  console.log("test ");
  try {
    await connectMongoDB();
    const body = await req.json();
    const { userId, location } = body

    const getUser = await User.findOne({ _id: userId });
    console.log(getUser.status);
    if (!getUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Update the user's location
    getUser.location = location;
    await getUser.save();

    return NextResponse.json({ user: getUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating the user location." },
      { status: 500 }
    );
  }
}
