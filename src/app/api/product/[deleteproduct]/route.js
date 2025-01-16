import { NextResponse } from "next/server";
import Product from "../../model/Product";
import { connectdb } from "../../database/db";

export async function DELETE(request, { params }) {
 
    const { deleteproduct } = await params; 
    
        await connectdb();

    try {
        
        const findProduct = await Product.findById(deleteproduct);

        if (!findProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        const deleteProduct = await Product.findByIdAndDelete(deleteproduct);

        if (!deleteProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" }, { status : 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
