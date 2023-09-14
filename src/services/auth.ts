import {request} from "@umijs/max";
import CONFIG from "../../config/server_config";
import {LoginUser} from "@/schema/auth/user";

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