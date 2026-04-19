import { api, ApiError } from "@/app/api/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  try {
    const { data } = await api.get("/users/favorites/animals", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    const err = error as ApiError;
    return NextResponse.json(
      { error: err.response?.data.message },
      { status: err.status },
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  try {
    const { data } = await api.delete("/users/favorites/animals", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    const err = error as ApiError;
    return NextResponse.json(
      { error: err.response?.data.message },
      { status: err.status },
    );
  }
}
