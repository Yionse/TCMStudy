import { useQuery } from "react-query";
import { fetchUpdateUserInfo } from "./apis/test";
import { post } from "./apis";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Todo from "./pages/Todo";
import Count from "./pages/Count";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import stores from "./stores";

export default function App() {
  // const { mutateAsync } = fetchUpdateUserInfo();
  // const { data } = useQuery(["test-data"], async () =>
  //   post<{ testType: number }>("/test")
  // );
  // console.log(data?.testType);

  return (
    <Provider store={stores}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<Home />} />
            <Route path="todo" element={<Todo />} />
            <Route path="count" element={<Count />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
