import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";

interface Params {
  params: Promise<{ animalId: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { animalId } = await params;
  console.log("nrxt");

  try {
    const { data } = await api.get(`/animals/${animalId}`);
    return NextResponse.json(data);
  } catch (error) {
    const err = error as ApiError;
    return NextResponse.json(
      { error: err.response?.data.message },
      { status: err.status },
    );
  }
}
