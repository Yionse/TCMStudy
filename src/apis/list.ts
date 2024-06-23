import { useQuery } from "react-query";
import { get } from ".";

export function getTCMList() {
  return useQuery(["TCM-list"], async () => get("/SSM/tcmMedicine/list"));
}

export function getFamousDoctorList() {
  return useQuery(["famous-doctor-list"], async () =>
    get("/SSM/FamousDoctor/list")
  );
}

export function getPrescriptionList() {
  return useQuery(["drug-list"], async () => get("/SSM/Prescription/list"));
}

export function getSymptomList() {
  return useQuery(["symptom-list"], async () => get("/SSM/Symptom/list"));
}
