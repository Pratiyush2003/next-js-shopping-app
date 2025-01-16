import jwt from 'jsonwebtoken';
import Product from '../model/Product';
import { connectdb } from '../database/db';
import { NextResponse } from 'next/server';

export async function GET(request) {

    const authorization = request.headers.get('Authorization')

    if (!authorization) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await connectdb();
    try {
        if (request.method === "GET") {
            const products = await Product.find({ userId: decoded.id });
            return NextResponse.json({ products }, { status: 200 });
        }; 
    } catch (error) {
            return  NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


export async function POST(request) {

    const authorization = request.headers.get('Authorization')

    if (!authorization) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authorization.split(" ")[1];
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await connectdb();
    
    const {productname, price, image, brand} = await request.json();

    console.log(productname, price, image, brand);
    if(!productname || !price || !image || !brand){
        return NextResponse.json({error : "All data required"}, {status : 403})
    }

    try {
        if (request.method === "POST") {
            const newProduct = await Product.create({ userId: decoded.id, productname, price, image, brand })
            return NextResponse.json({ newProduct }, { status: 200 });
        }
    } catch (error) {
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
