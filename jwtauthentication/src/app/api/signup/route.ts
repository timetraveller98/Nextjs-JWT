import { jwtModel } from "@/app/lib/schemaModel/model";
import Connect from "@/app/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";


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
    try {
    let result = new jwtModel(payload);
    result  = await result.save();
    const jwtKey:any = process.env.JWT_SECRET;
    const jwtToken = jwt.sign({ name, email }, jwtKey, { expiresIn: "1h" });  //Generate JWT Token
    const response = NextResponse.json({ message: "User Successfully Added",token:jwtToken,success:true }, { status: 200 });
    response.cookies.set("token", jwtToken,{
      httpOnly:true
    })   //Save Token in Cookies
    return response
  } catch (err:any) {
    return NextResponse.json({ message: err, success:false }, { status: 500 })
  }
}




