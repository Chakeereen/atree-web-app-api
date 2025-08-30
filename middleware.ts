// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // บล็อกทุกหน้า /admin/*
  if (url.pathname.startsWith("/admin")) {
    // ดึง token จาก Authorization header หรือ cookie
    const authHeader = req.headers.get("Authorization");
    let token: string | null = null;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies.get("accessToken")) {
      token = req.cookies.get("accessToken")?.value || null;
    }

    if (!token) {
      url.pathname = "/login"; // ยังไม่ได้ login → redirect ไป login
      return NextResponse.redirect(url);
    }

    try {
      const payload: any = jwt.verify(token, JWT_SECRET);

      // ตรวจ role
      if (payload.role !== "admin") {
        url.pathname = "/"; // role ไม่ใช่ admin → redirect หน้าอื่น
        return NextResponse.redirect(url);
      }
    } catch (err) {
      url.pathname = "/login"; // token ไม่ถูกต้อง → redirect login
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// ระบุ path ที่ middleware จะทำงาน
export const config = {
  matcher: ["/admin/:path*"],
};
