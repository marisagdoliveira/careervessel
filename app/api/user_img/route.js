import fs from 'fs';
import path from 'path';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from "next/server";

const uploadDir = path.join(process.cwd(), 'public/assets/userPics');

export async function POST(req) {
  const { userId, img } = await req.json();

  if (!userId || !img) {
    return NextResponse.json({ message: "Missing userId or image data in request body" }, { status: 400 });
  }

  try {

    const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
    const binaryData = Buffer.from(base64Data, 'base64');


    const fileName = `${userId}.jpg`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, binaryData);


    await connectMongoDB();
    let getUser = await User.findOne({ _id: userId });
    if (!getUser) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    getUser.img = fileName;
    await getUser.save();

    return NextResponse.json({ fileName }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ message: 'Error uploading file' }, { status: 500 });
  }
}
