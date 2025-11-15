export interface ICompanyData {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  created_at: string;
  updated_at: string;
  ftp_username: string;
  ftp_password: string;
  is_active: boolean;
}

export interface ICompanyCreateFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}
