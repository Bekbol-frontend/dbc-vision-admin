import API from "@/shared/api";
import type {
  ICompany,
  IFilial,
  IUserRegisterCreateData,
  IUserRegisterData,
} from "../types";

export const getUsers = async () => {
  return await API.get<{ data: IUserRegisterData[] }>("users/register");
};

export const getCompany = async () => {
  return await API.get<{ data: ICompany[] }>("company");
};

export const getFilials = async (companyId: number) => {
  return await API.get<{ data: IFilial[] }>(`filials/by-company/${companyId}`);
};

export const createUsersRegister = async (data: IUserRegisterCreateData) => {
  return await API.post("users/register/", data);
};

export const deleteUsersRegister = async (id: number) => {
  return await API.delete(`users/user/${id}/`);
};

export const getUserByIdRegister = async (id: number) => {
  return await API.get<{ data: IUserRegisterData }>(`users/user/${id}/`);
};

interface IUpdateData {
  id: number;
  data: IUserRegisterCreateData;
}

export const updateUsersRegister = async (data: IUpdateData) => {
  return await API.put(`users/user/${data.id}/`, data.data);
};
