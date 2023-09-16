import { jwtModel } from "@/app/lib/schemaModel/model";
import Connect from "@/app/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
const salt = 10;


//SIGNUP POST API

export async function POST(req:Request) {
  
    
    const payload = await req.json();
    const {name, email, password } = payload;
    if (!name|| !email || !password) {          //For check email name and password is preesent in input box
      return NextResponse.json({ message: "Invalid Fields",success:false }, { status: 400 })
    }
   
    Connect();   //Add Database Connenction
   
    const isUserPresent = await jwtModel.findOne({ email })
    if (isUserPresent) {       // Check user if not present in database
      return NextResponse.json({ message: "User Already Present",success:false }, { status: 409 })
    }
    const secretPassword = await bcrypt.hash(password,salt); //Create a Secret Key
    try {
    let result = new jwtModel({name,email,password:secretPassword});
    result  = await result.save();
    const secretKey = crypto.randomUUID();
    const token = jwt.sign({ name, email }, secretKey, { expiresIn: "1h" });  //Generate JWT Token
    const response = NextResponse.json({ message: "User Successfully Added",success:true }, { status: 200 });
    response.cookies.set("token", token,{
      httpOnly:true
    })   //Save Token in Cookies
    return response
  } catch (err:any) {
    return NextResponse.json({ message: err, success:false }, { status: 500 })
  }
}




