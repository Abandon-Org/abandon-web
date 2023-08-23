import React from 'react';
import { useAccess } from 'umi';

export default function DynamicMenu() {
    const access = useAccess();

    if (!access) {
        // 如果用户信息为空，可以渲染 loading 状态或者其他内容
        return <p>Loading...</p>;
    }

    return (
        <div>
            {access.isAdmin && <p>超级管理员页面内容</p>}
            {access.isUser && <p>普通用户页面内容</p>}
        </div>
    );
}
