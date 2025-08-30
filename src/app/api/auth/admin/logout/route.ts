// src/app/api/auth/admin/logout/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const res = NextResponse.json({ message: "Logout สำเร็จ" });

    // ลบ accessToken cookie
    res.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // ลบ cookie
    });

    // ลบ refreshToken cookie
    res.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // ลบ cookie
    });

    return res;
  } catch (err) {
    console.error("Logout Error:", err);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
