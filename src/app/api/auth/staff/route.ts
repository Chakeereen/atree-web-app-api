// src/app/api/auth/staff/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken } from "@/utils/่jwt";



export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // หา staff จาก DB
    const staff = await prisma.staff.findUnique({ where: { email } });
    if (!staff) {
      return NextResponse.json({ error: "Staff not found" }, { status: 404 });
    }

    // ตรวจสอบ password
    const validPassword = await bcrypt.compare(password, staff.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // สร้าง tokens
    const accessToken = generateAccessToken(staff.staffID); // <-- ใช้ staffID
    const refreshToken = generateRefreshToken(staff.staffID);

    // ตอบกลับ Access Token + เก็บ Refresh Token ใน Cookie
    const res = NextResponse.json({
      message: "Login successful",
      accessToken,
      staff: {
        staffID: staff.staffID,
        name: staff.name,
        email: staff.email,
        role: staff.role,
      },
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 วัน
    });

    return res;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
