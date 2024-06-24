import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import { Provider } from "react-redux";
import stores from "./stores";
import { TabContextProvide } from "./contexts/TabContextProvide";
import TCM from "./pages/tcm";
import FamousDoctor from "./pages/famousDoctor";
import PrescriptionPage from "./pages/prescription";
import SymptomPage from "./pages/symptom";
import DiscussPage from "./pages/discuss";

export default function App() {
  return (
    <Provider store={stores}>
      <TabContextProvide>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Index />} />
            <Route path="tcm" element={<TCM />} />
            <Route path="doctor" element={<FamousDoctor />} />
            <Route path="prescription" element={<PrescriptionPage />} />
            <Route path="symptom" element={<SymptomPage />} />
            <Route path="discuss" element={<DiscussPage />} />
            <Route path="*" element={<div>页面飞走了</div>} />
          </Routes>
        </BrowserRouter>
      </TabContextProvide>
    </Provider>
  );
}
