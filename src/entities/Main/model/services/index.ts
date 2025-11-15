import API from "@/shared/api";
import type { ICompanyCreateFormData, ICompanyData } from "../types";

export const getCompanyData = async () => {
  return await API.get<{ data: ICompanyData[] }>("company/");
};

export const createCompany = async (data: ICompanyCreateFormData) => {
  return await API.post("company/", data);
};

export const deleteCompnay = async (id: number) => {
  return await API.delete(`company/${id}/`);
};

export const getCompanyDataById = async (id: number) => {
  return await API.get<{ data: ICompanyData }>(`company/${id}/`);
};

interface IUpdateCompanyData {
  id: number;
  data: ICompanyCreateFormData;
}

export const updateCompnay = async (data: IUpdateCompanyData) => {
  return await API.put(`company/${data.id}/`, data.data);
};
