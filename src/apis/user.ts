import { useMutation } from "react-query";
import { post } from ".";

export function fetchRegister() {
  return useMutation(async (data: any) => post("/SSM/user/registry", data));
}

export function fetchLogin() {
  return useMutation(async (data: any) => post("/SSM/user/login", data));
}
