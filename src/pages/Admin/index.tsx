import React from 'react';
import { useAccess } from 'umi';

export default function MyComponent() {
    const access = useAccess();
    console.log(access); // 打印 access 对象，检查角色判断是否生效

    return (
        <div>
            {access.isUser && <p>普通用户页面内容</p>}
            {access.isLeader && <p>组长页面内容</p>}
            {access.isAdmin && <p>超级管理员页面内容</p>}
        </div>
    );
}
