import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CSTR_EMAIL,
        pass: process.env.CSTR_EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"CSTR Website" <${process.env.CSTR_EMAIL}>`,
      to: process.env.CSTR_EMAIL,
      subject: subject || "New message from CSTR website",
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      replyTo: email
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Email failed" },
      { status: 500 }
    );
  }
}
