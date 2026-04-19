import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { parse } from "cookie";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { data, headers } = await api.post("auth/register", body);

    // Отримуємо cookie storage Next.js для поточного request/response cycle
    const cookieStore = await cookies(); // самостійно записується у браузер

    // Забираємо header set-cookie з backend response
    const setCookie = headers["set-cookie"];

    // Якщо backend прислав cookie
    if (setCookie) {
      // Axios може повернути:
      // string або string[]
      // тому завжди приводимо до масиву
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      // Проходимося по кожному cookie рядку
      for (const cookieStr of cookieArray) {
        // Парсимо raw cookie string у JS object
        // Напр:
        // accessToken=abc123; Path=/; Max-Age=3600
        const parsed = parse(cookieStr);

        console.log(3, parsed);

        // Формуємо options для Next cookieStore.set()
        const options = {
          // Якщо backend прислав expires → перетворюємо у Date
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,

          // Шлях cookie
          path: parsed.Path, //для яких сторінок сайту браузер буде прикріпляти цю cookie

          // Час життя cookie в секундах
          maxAge: Number(parsed["Max-Age"]),
        };

        // у нас може бути одинна з кук або ексес, або рефреш

        // Якщо це access token cookie
        if (parsed.accessToken) {
          // Встановлюємо accessToken у Next.js cookies
          cookieStore.set("accessToken", parsed.accessToken, options);
        }

        // Якщо це refresh token cookie
        if (parsed.refreshToken) {
          // Встановлюємо refreshToken у Next.js cookies
          cookieStore.set("refreshToken", parsed.refreshToken, options);
        }

        // if (parsed.sessionId) {
        //   cookieStore.set("sessionId", parsed.sessionId, options);
        // }
      }

      // Якщо cookies успішно встановились —
      // повертаємо data з backend
      return NextResponse.json(data);
    }

    // Якщо backend не прислав set-cookie —
    // вважаємо що авторизація неуспішна
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
