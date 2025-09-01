// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// แปลง secret เป็น Uint8Array สำหรับ jose
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  console.log(JWT_SECRET)
  // ตรวจทุก path /admin/*
  if (url.pathname.startsWith("/admin")) {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      // ไม่มี token → redirect ไป login
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      // ตรวจ token
      const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

      const { payload } = await jwtVerify(token, secret, {
        algorithms: ["HS256"],
      });
      // ตรวจ role
      if ((payload as any).role !== "admin") {
        url.pathname = "/"; // role ไม่ใช่ admin → redirect หน้าอื่น
        return NextResponse.redirect(url);
      }
    } catch (err) {
      console.log(err)
      // token ไม่ถูกต้อง → redirect login
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// ระบุ path ที่ middleware จะทำงาน
export const config = {
  matcher: ["/admin/:path*"],
};
