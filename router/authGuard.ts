import { history } from 'umi';

// 模拟判断token是否有效的函数
function isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    // 假设你使用的是JWT，这里可以根据具体需求进行判断
    // 返回 true 表示有效，返回 false 表示无效
    return token !== null;
}

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps): React.ReactNode {
    // 在进入路由之前进行判断
    if (!isTokenValid()) {
        // token 无效，跳转到登录页面
        history.push('/login');
        return null;
    }

    // token 有效，渲染子组件
    return children;
}