import { connectdb } from "../database/db";
import crypto from "crypto";
import User from "../model/User";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();
    console.log("this is email " + email);

    await connectdb();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: "pratiyushs37@gmail.com",
        pass: "tfvj tixs sxlp ravg",
      },
    });

    const resetLink = `https://next-js-shopping-app-two.vercel.app/uipages/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: "pratiyushs37@gmail.com",
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link is valid for 1 hour.</p>`,
    });

    return NextResponse.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
