import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../api";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page");
  const type = req.nextUrl.searchParams.get("type");
  const search = req.nextUrl.searchParams.get("search");

  try {
    const { data } = await api.get("/animals", {
      params: {
        page,
        type,
        search,
        perPage: 12,
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
