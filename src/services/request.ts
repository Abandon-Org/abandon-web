import CONFIG from "../../config/server_config";
import {request} from "@umijs/max";
import auth from "@/utils/auth";

interface HttpRequestParams {
  method: string;
  data?: any;
  headers?: any;
}

export async function httpRequest(params: HttpRequestParams) {
  return request(`${CONFIG.SERVER_URL}/request/http`, {
    method: 'POST',
    data: params,
    headers: auth.headers(),
  });
}
