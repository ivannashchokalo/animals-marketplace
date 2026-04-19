import { cookies } from "next/headers";
import { nextServer } from "./api";

export const serverRefresh = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.post("/auth/refresh", null, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
