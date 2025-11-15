export interface IUserCompany {
  address: string;
  created_at: string;
  email: string;
  ftp_password: string;
  ftp_username: string;
  id: number;
  is_active: boolean;
  name: string;
  phone: string;
  updated_at: string;
  website: string;
}

export interface IUserRegisterData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  role: string;
  company: number;
  user_company?: IUserCompany;
  filials: number[];
  is_superuser: boolean;
}

export interface IUserRegisterCreateData {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  role: string;
  company: number;
  filials: number[];
}

export interface ICompany {
  address: string;
  created_at: string;
  email: string;
  ftp_password: string;
  ftp_username: string;
  id: number;
  is_active: boolean;
  name: string;
  phone: string;
  updated_at: string;
  website: string;
}

export interface IFilial {
  id: number;
  name: string;
  address: string;
}
