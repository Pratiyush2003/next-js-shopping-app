import { NextResponse } from "next/server";
import { connectdb } from "../database/db";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "../model/User";

export async function POST(request){
    if(request.method !== "POST") return NextResponse.json({error : "method not allowed"}, {status : 404});

    const {email , password} = await request.json();

    if(!email || !password) return NextResponse.json({error : "All Details Required"}, {status : 400});
    
    await connectdb();

    const user = await User.findOne({email});

    if(!user || !(await bcrypt.compare(password , user.password))){
      return NextResponse.json({error : "Incorrect username and password"}, {status : 401});
    }

    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "365d"});
    return NextResponse.json({token}, {status : 200});
}