import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { cookies } from "next/headers";

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const cookieStore = await cookies();
  try {
    const { data } = await api.patch("/users/favorites", body, {
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

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const cookieStore = await cookies();
  try {
    const { data } = await api.delete("/users/favorites", {
      data: body,
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

export async function GET() {
  const cookieStore = await cookies();
  try {
    const { data } = await api.get("/users/favorites", {
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
