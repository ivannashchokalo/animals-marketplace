import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { data, headers } = await api.post("/auth/login", body);
    const cookieStore = await cookies();
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
      return NextResponse.json(data);
    }

    NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.message ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}
