import { useQuery } from "react-query";
import { get } from ".";

export function getTCMList() {
  return useQuery(["TCM-list"], async () => get("/SSM/tcmMedicine/list"));
}

export function getTcmDetail(id: number) {
  return useQuery(["tcm-detail"], async () =>
    get("/SSM/tcmMedicine/id", { id })
  );
}

export function getFamousDoctorList() {
  return useQuery(["famous-doctor-list"], async () =>
    get("/SSM/FamousDoctor/list")
  );
}

export function getPrescriptionList() {
  return useQuery(["drug-list"], async () => get("/SSM/Prescription/list"));
}

export function getPrescriptionDetail(id: number) {
  return useQuery(["drug-detail"], async () =>
    get("/SSM/Prescription/id", { id })
  );
}

export function getSymptomList() {
  return useQuery(["symptom-list"], async () => get("/SSM/syn/list"));
}

export function getSymptomDetail(id: number) {
  return useQuery(["symptom-detail"], async () =>
    get("/SSM/Symptoms/id", { id })
  );
}

export function getList() {
  return useQuery(["posts"], async () => get("/SSM/posts/list"));
}

export function getPostDetail(id: number) {
  return useQuery(["post-detail"], async () => get("/SSM/posts/id", { id }));
}
