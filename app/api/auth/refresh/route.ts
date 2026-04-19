import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api } from "../../api";
import { parse } from "cookie";

export async function POST() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionId = cookieStore.get("sessionId")?.value;

  if (accessToken) {
    return NextResponse.json({ success: true });
  }

  if (refreshToken && sessionId) {
    const { headers } = await api.post("auth/refresh", null, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const setCookie = headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed["Max-Age"]),
        };

        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken, options);
        }
        if (parsed.sessionId) {
          cookieStore.set("sessionId", parsed.sessionId, options);
        }
      }
      return NextResponse.json({ success: true });
    }
  }
  return NextResponse.json({ success: false });
}
