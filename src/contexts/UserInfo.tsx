import { createContext, useState } from "react";

export const UserInfoContext = createContext<any>({});

export function UserInfoProvider(props: any) {
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserInfoContext.Provider
      value={{ userInfo, setUserInfo, isLoggedIn, setIsLoggedIn }}
    >
      {props.children}
    </UserInfoContext.Provider>
  );
}
