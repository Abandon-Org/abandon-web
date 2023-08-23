// {
//   path: '/welcome',
//   component: 'IndexPage',
//   name: '欢迎', // 兼容此写法
//   icon: 'testicon',
//   // 更多功能查看
//   // https://beta-pro.ant.design/docs/advanced-menu
//   // ---
//   // 新页面打开
//   target: '_blank',
//   // 不展示顶栏
//   headerRender: false,
//   // 不展示页脚
//   footerRender: false,
//   // 不展示菜单
//   menuRender: false,
//   // 不展示菜单顶栏
//   menuHeaderRender: false,
//   // 权限配置，需要与 plugin-access 插件配合使用
//   access: 'canRead',
//   // 隐藏子菜单
//   hideChildrenInMenu: true,
//   // 隐藏自己和子菜单
//   hideInMenu: true,
//   // 在面包屑中隐藏
//   hideInBreadcrumb: true,
//   // 子项往上提，仍旧展示,
//   flatMenu: true,


// },

export default [
    // Home 页面
    {
        name: 'Home',
        path: '/home',
        component: './Home',
    },
    // 仪表盘页面及子菜单
    {
        name: '仪表盘',
        path: '/access',
        routes: [
            // 重定向到 /access/Dashboard
            {
                path: '/access',
                redirect: '/access/Dashboard',
            },
            // 仪表盘页面
            {
                path: '/access/Dashboard',
                name: 'Dashboard',
                component: '@/pages/Dashboard',
            },
            // 看板页面
            {
                path: '/access/Staging',
                name: 'Staging',
                component: '@/pages/Staging',
            },
        ],
    },
    // 项目管理页面
    {
        name: '项目管理',
        path: '/project',
        component: './Project',
    },
    // 接口测试页面及子菜单
    {
        name: '接口测试',
        path: '/apitest',
        access: 'isUser',
        routes: [
            // 重定向到 /apitest/testcase
            {
                path: '/apitest',
                redirect: '/apitest/testcase',
            },
            // 接口用例页面
            {
                path: '/apitest/testcase',
                name: '接口用例',
                component: '@/pages/Apitest/Testcase',
            },
            // 测试计划页面
            {
                path: '/apitest/Testplan',
                name: '测试计划',
                component: '@/pages/Apitest/Testplan',
            },
        ],
    },
    // 测试报告页面及子菜单
    {
        name: '测试报告',
        path: '/report',
        routes: [
            // 重定向到 /report/apireport
            {
                path: '/report',
                redirect: '/report/apireport',
            },
            // 接口测试报告页面
            {
                path: '/report/apireport',
                name: '接口测试报告',
                component: '@/pages/Report/Apireport',
            }
        ],
    },
    // 登录页面
    { path: '/login', layout: false, component: './Login' },
    // 默认首页重定向到 /home
    {
        path: '/',
        redirect: '/home',
    },
    // 在线工具页面及子菜单
    {
        name: '在线工具',
        path: '/tools',
        access: 'isUser',
        routes: [
            // 重定向到 /tools/HTTPrequest
            {
                path: '/tools',
                redirect: '/tools/HTTPrequest',
            },
            // HTTP请求工具页面
            {
                path: '/tools/HTTPrequest',
                name: 'HTTPrequest',
                component: '@/pages/Tools/HTTPrequest',
            },
        ],
    },
    // Mock配置页面
    {
        name: 'Mock配置',
        path: '/mock',
        access: 'isUser',
        component: './Mock',
    },
    // 资源管理页面及子菜单
    {
        name: '资源管理',
        path: '/management',
        routes: [
            // 重定向到 /management/environment
            {
                path: '/management',
                redirect: '/management/environment',
            },
            // 环境配置页面
            {
                path: '/management/environment',
                name: '环境配置',
                component: '@/pages/Management/Environment',
            },
            // 域名配置页面
            {
                path: '/management/domainname',
                name: '域名配置',
                component: '@/pages/Management/Domainname',
            },
            // 全局变量页面
            {
                path: '/management/globalvariable',
                name: '全局变量',
                component: '@/pages/Management/Globalvariable',
            },
        ],
    },
    {
        path: '/backstage',
        name: '后台管理',
        access: 'isAdmin', // 只有管理员可以访问
        routes: [
            // 重定向
            {
                path: '/backstage',
                redirect: '/backstage/usermanage',
            },
            // 环境配置页面
            {
                path: '/backstage/usermanage',
                name: '用户管理',
                component: '@/pages/Backstage/Usermanage',
            },
        ],
    },
    // 通配符路由，配置 404 页面组件，exact: false 表示匹配所有未定义的路由
    { path: '*', component: './404', exact: false },
];
