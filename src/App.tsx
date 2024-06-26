import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import { TabContextProvide } from "./contexts/TabContextProvide";
import TCM from "./pages/tcm";
import FamousDoctor from "./pages/famousDoctor";
import PrescriptionPage from "./pages/prescription";
import SymptomPage from "./pages/symptom";
import DiscussPage from "./pages/discuss";
import Home from "./pages/home";
import { UserInfoProvider } from "./contexts/UserInfo";
import TcmDetail from "./pages/tcm/detail";
import PrescriptionPageDetail from "./pages/prescription/detail";
import SymptomPageDetail from "./pages/symptom/detail";
import Center from "./pages/center";
import Resource from "./pages/resource";
import SearchPage from "./pages/search";
import DiscussDetail from "./pages/discuss/detail";

export default function App() {
  return (
    <TabContextProvide>
      <UserInfoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />}>
              <Route index element={<Home />} />
              <Route path="tcm" element={<TCM />} />
              <Route path="tcmDetail" element={<TcmDetail />} />
              <Route path="doctor" element={<FamousDoctor />} />
              <Route path="prescription" element={<PrescriptionPage />} />
              <Route
                path="prescriptionDetail"
                element={<PrescriptionPageDetail />}
              />
              <Route path="symptom" element={<SymptomPage />} />
              <Route path="symptomDetail" element={<SymptomPageDetail />} />
              <Route path="discuss" element={<DiscussPage />} />
              <Route path="discussDetail" element={<DiscussDetail />} />
              <Route path="center" element={<Center />} />
              <Route path="resource" element={<Resource />} />
              <Route path="search" element={<SearchPage />} />
            </Route>
            <Route path="*" element={<div>页面飞走了</div>} />
          </Routes>
        </BrowserRouter>
      </UserInfoProvider>
    </TabContextProvide>
  );
}
