//файл, який запускається до того, як Next почне рендерити сторінку

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// список приватних маршрутів
const privateRoutes = ["/favorites"];

export function proxy(request: NextRequest) {
  // request на сторінку

  const sessionId = request.cookies.get("sessionId");
  const refreshToken = request.cookies.get("refreshToken");

  // перевіряємо, чи це приватний маршрут
  const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname);

  if (isPrivateRoute && (!sessionId || !refreshToken)) {
    // перекидаємо користувача на sign-in
    return NextResponse.redirect(new URL("/auth/sign-in", request.url)); //візьми шлях /auth/sign-in і побудуй його на основі поточного домену request.url
  }

  return NextResponse.next();
}

// Без matcher middleware може запускатись майже на все
// middleware запускай тільки для цих шляхів:
export const config = {
  matcher: ["/favorites"],
};
