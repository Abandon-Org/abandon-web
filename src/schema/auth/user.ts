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

    phone: string | null;
    role: number;
    update_user: number | null;
    updated_at: string;
}