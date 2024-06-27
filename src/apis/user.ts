import { useMutation, useQuery } from "react-query";
import { get, post } from ".";

export function fetchRegister() {
  return useMutation(async (data: any) => post("/SSM/user/registry", data));
}

export function fetchLogin() {
  return useMutation(async (data: any) => post("/SSM/user/login", data));
}

export function getUserInfo(id: number) {
  return useQuery(["userInfo", id], async () => get("/SSM/user/id", { id }));
}

export function fetchUpdateUserInfo() {
  return useMutation(async (data: any) => post("/SSM/user/update", data));
}
