import { nextServer } from "./service";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
}

export const login = async (body: LoginPayload) => {
  const { data } = await nextServer.post("/auth/login", body);
  return data;
};

export const register = async (body: RegisterPayload) => {
  const { data } = await nextServer.post("/auth/register", body);
  return data;
};

export const logout = async () => {
  const { data } = await nextServer.post("/auth/logout");
  return data;
};
