import { connectdb } from "../database/db";
import User from "../model/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request){
        if(request.method !== "POST") return NextResponse.json({error : "method not allowed"}, {status : 405});

        const {username , email , password} = await request.json();

        if(!username || !email || !password){
            return NextResponse.json({error : "All details are required"}, {status : 400});
        }

        await connectdb();
        const user = await User.findOne({email});
        
        if(user){
          return NextResponse.json({error : "User already exist"}, {status : 200})
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        try {
            await User.create({username, email, password : hashedpassword});
            return NextResponse.json({message : "User has been created"}, {status : 201});
        } catch (error) {
            return NextResponse.json({error : "Internal server error"}, {status : 500 })
        }
}
