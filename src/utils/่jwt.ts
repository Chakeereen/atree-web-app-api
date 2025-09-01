import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

// สร้าง Access Token (อายุสั้น) พร้อม role
export const generateAccessToken = (adminID: string, role: string) => {
  return jwt.sign({ adminID, role }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

// สร้าง Refresh Token (อายุยาว)
export function generateRefreshToken(userId: string) {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

// ตรวจสอบ Access Token
export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

// ตรวจสอบ Refresh Token
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}
