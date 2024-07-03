import { useMutation, useQuery } from "react-query";
import { get, post } from ".";

// ?postId=${data?.postId}&commentContent=${data?.commentContent}&userId=${data?.userId}

export function fetchAddComment() {
  return useMutation(async (data: any) => post(`/SSM/comment/add`, data));
}

export function fetchAddDiscussion() {
  return useMutation(async (data: any) => post(`/SSM/posts/add`, data));
}

export function fetchDownloadFile() {
  return useMutation(async (data: any) => post(`/SSM/downLoad/down`, data));
}

export function getPersonalPosts(id: number) {
  return useQuery(["personalPosts"], async () =>
    get(`/SSM/posts/userList?id=${id}`)
  );
}

export function fetchDeletePost() {
  return useMutation(async (data: any) =>
    post(`/SSM/posts/delete?id=${data?.id}`)
  );
}

export function getStudyTaskList(id: number) {
  return useQuery(["studyTaskList"], async () =>
    get(`/SSM/studyPlan/list`, { id })
  );
}

export function fetchTaskList() {
  return useMutation(async (data: any) => get(`/SSM/studyPlan/list`, data));
}

export function fetchAddTask() {
  return useMutation(async (data: any) => post(`/SSM/studyPlan/add`, data));
}

export function fetchAddStudyCount() {
  return useMutation(async (data: any) => post(`/SSM/studyPlan/update`, data));
}

export function fetchSearchPost() {
  return useMutation(async (data: any) =>
    get(`/SSM/posts/postLike?like=${data}`)
  );
}

export function fetchSearchTcm() {
  return useMutation(async (data: any) =>
    get(`/SSM/tcmMedicine/tcmLike?like=${data}`)
  );
}

export function fetchSearchDoctor() {
  return useMutation(async (data: any) =>
    get(`/SSM/FamousDoctor/like?like=${data}`)
  );
}

export function fetchSearchPrescription() {
  return useMutation(async (data: any) =>
    get(`/SSM/Prescription/like?like=${data}`)
  );
}

export function fetchSearchSymptom() {
  return useMutation(async (data: any) =>
    get(`/SSM/Symptoms/like?like=${data}`)
  );
}

export function getStudyRecord(id: any) {
  return useQuery(["studyRecord"], async () =>
    get(`/SSM/studyRecords/records`, { userId: id })
  );
}
