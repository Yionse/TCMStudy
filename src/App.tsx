import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import { Provider } from "react-redux";
import stores from "./stores";
import { TabContextProvide } from "./contexts/TabContextProvide";

export default function App() {
  return (
    <Provider store={stores}>
      <TabContextProvide>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TabContextProvide>
    </Provider>
  );
}
