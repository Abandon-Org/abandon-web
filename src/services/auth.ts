import {request} from "@umijs/max";
import CONFIG from "../../config/server_config";

export interface PityResponse {
  code: number;
  data?: any;
  msg?: string;
}

export interface LoginResponse {
  token: string;
  expire: number;
  user: LoginUser;
}

export interface LoginUser {
  id: number;
  username: string;
  name: string;
  email: string;

  avatar: string;
  created_at: string;
  deleted_at: number;

  is_valid: boolean;
  last_login_at: string;

  role: number;
  update_user: number | null;
  updated_at: string;
}

export async function currentUser(params: Record<string, string>) {
  return request<{
    data: LoginUser;
    msg?: string;
    code: number;
  }>(`${CONFIG.SERVER_URL}/auth/query`, {
    method: 'GET',
    params,
  });
}