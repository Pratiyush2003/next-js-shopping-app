import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export async function POST(req) {
  try {
    const body = await req.json(); 
    const { cartItems } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const line_items = cartItems.products.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productname,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/uipages/Success`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/uipages/Cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
