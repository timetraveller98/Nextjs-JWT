import { jwtModel } from "@/app/lib/schemaModel/model";
import Connect from "@/app/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import crypto from 'crypto';


//LOGIN POST API

export async function POST(req:Request) {
    const payload = await req.json();
    const { email, password } = payload;
    if (!email && !password) {     //For check email and password is preesent in input box
      return NextResponse.json({ message: "Invalid User" }, { status: 400 })
    }
    Connect();  //Add Database Connenction
    try {
    const isUserPresent = await jwtModel.findOne({ email,password })
    if (!isUserPresent) {       // Check user if not present in database
      return NextResponse.json({ message: "Invalind Credentials",success:false }, { status: 409 })
    }

    const secretKey = crypto.randomUUID();  //Create a Secret Key for JWT
    const secret = isUserPresent.password;  // Get Password
    const token = jwt.sign({ secret, email }, secretKey, { expiresIn: "1h" });  //Generate JWT Token
    const response = NextResponse.json({ message: "User Successfully Login",success:true }, { status: 200 });
    response.cookies.set("token", token,{
      httpOnly:true
    })   //Save Token in Cookies
    return response
  } catch (err) {
    return NextResponse.json({ message: err, success:false }, { status: 500 })
  }
}




