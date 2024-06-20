import { useMutation } from "react-query";
import { post } from ".";

export function fetchUpdateUserInfo() {
  return useMutation(async (data: { userId: string }) =>
    post<{ isSuccess: boolean }>("/update", data)
  );
}
