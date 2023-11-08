import CONFIG from '@/consts/config';
import auth from '@/utils/auth';
import request from '@/utils/request'

export async function queryCurrent(params: any) {
    return await request(`${CONFIG.URL}/auth/query`, {
        method: 'GET',
        params,
    });
}

export async function deleteNotice(params: any) {
    return await request(`${CONFIG.URL}/notification/delete`, {
        method: 'POST',
        data: params,
        headers: auth.headers(),
    });
}

export async function listUsers(params: any) {
    const res = await request(`${CONFIG.URL}/auth/listUser`, {
        method: 'GET',
        params,
        headers: auth.headers(),
    });
    if (auth.response(res)) {
        return res;
    }
    return [];
}

export async function updateUsers(data: any) {
    return await request(`${CONFIG.URL}/auth/update`, {
        method: 'POST',
        data,
        headers: auth.headers(),
    });
}

export async function deleteUsers(params: any) {
    return await request(`${CONFIG.URL}/auth/delete`, {
        method: 'GET',
        params,
        headers: auth.headers(),
    });
}
