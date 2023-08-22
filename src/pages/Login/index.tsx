import {LockOutlined, MailOutlined, MobileOutlined, UserOutlined} from '@ant-design/icons';
import {request, history} from '@umijs/max';
import {LoginForm, ProFormCheckbox, ProFormText} from '@ant-design/pro-form';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import CONFIG from "../../../config/server_config";


const Login: React.FC = () => {
    const [type, setType] = useState<string>('account');
    // 在这里声明一个名为type的状态变量，并初始化为'account'

    const handleSubmit = async (values: API.LoginParams) => {
        // 定义一个名为handleSubmit的异步函数，接受一个名为values的参数，类型为API.LoginParams

        if (type === 'account') {
            // 如果type等于'account'，执行下面的代码块

            const response = await request(CONFIG.SERVER_URL + '/auth/login', {
                // 使用await关键字等待请求的结果，并将结果赋值给response变量
                // 使用CONFIG.SERVER_URL来构建请求的完整URL，'/auth/login'是登录接口的路径

                method: 'POST',
                data: {
                    username: values?.username,
                    password: values.password
                },
                // 传递给登录接口的数据，根据您的需求传递相应的数据
            });

            if (response.code === 200) {
                // 如果响应的状态码为200，表示登录成功

                message.success('登录成功');
                // 在界面上显示一个成功的消息
                localStorage.setItem("AbandonToken",response.data.token);
                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/');
                // 使用history.push()方法进行页面跳转，重定向到redirect参数指定的页面，如果redirect参数不存在则重定向到根路径'/'
                return;
            }

            message.error(response.msg);
            // 如果登录失败，显示一个错误消息
        } else {
            // 如果type不等于'account'，执行下面的代码块

            const response = await request(CONFIG.SERVER_URL + '/auth/register', {
                // 使用await关键字等待请求的结果，并将结果赋值给response变量
                // 使用CONFIG.SERVER_URL来构建请求的完整URL，'/auth/register'是注册接口的路径

                method: 'POST',
                data: {
                    name: values?.name,
                    password: values.password,
                    email: values?.email,
                    username: values.username
                }
                // 传递给注册接口的数据，根据您的需求传递相应的数据
            });
            if (response.code === 200) {
                // 如果响应的状态码为200，表示注册成功
                message.success('注册成功');
                // 在界面上显示一个成功的消息
                return;
            }
            message.error(response.msg);
            // 如果注册失败，显示一个错误消息
        }
    };


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'auto',
            backgroundImage: "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
            backgroundSize: '100% 100%'
        }}>
            <div style={{width: 42, height: 42, lineHeight: '42px', position: 'fixed', right: 16, borderRadius: 4}}>
                {/* SelectLang组件 */}
            </div>
            <div style={{flex: '1', padding: '32px 0'}}>
                <LoginForm
                    contentStyle={{minWidth: 280, maxWidth: '75vw'}}
                    // logo={<img alt="logo" src="/logo.svg" />}
                    title="Abandon"
                    subTitle="欢迎来到Abandon"
                    initialValues={{autoLogin: true}}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                >
                    <Tabs activeKey={type} onChange={setType} centered>
                        <Tabs.TabPane key="account" tab="登录"/>
                        {/*<Tabs.TabPane key="register" tab="注册"/>*/}
                    </Tabs>
                    {type === 'account' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined/>,
                                }}
                                placeholder="Username"
                                rules={[
                                    {required: true, message: "请输入账号！"},
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined/>,
                                }}
                                placeholder="Password"
                                rules={[
                                    {required: true, message: "请输入密码！"},
                                ]}
                            />
                        </>
                    )}

                    {type === 'register' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined/>,
                                }}
                                name="username"
                                placeholder="请输入用户名"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入用户名",
                                    }
                                ]}
                            />
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined/>,
                                }}
                                name="name"
                                placeholder="请输入姓名"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入姓名",
                                    }
                                ]}
                            />
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MailOutlined/>,
                                }}
                                name="email"
                                placeholder="请输入用户邮箱"
                                rules={[
                                    {
                                        type: 'email',
                                        required: true,
                                        message: "请输入合法的邮箱",
                                    }
                                ]}
                            />
                            <ProFormText.Password
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined/>,
                                    type: 'password'
                                }}
                                name="password"
                                placeholder="请输入用户密码"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入用户密码",
                                    }
                                ]}
                            />
                        </>
                    )}
                    <div style={{marginBottom: 24}}>
                        {type === 'register' ? null :
                            <ProFormCheckbox noStyle name="autoLogin">记住我</ProFormCheckbox>
                        }
                        <a style={{float: 'right'}}>
                            {type === 'register' ? null :
                                "忘记密码？"
                            }
                        </a>
                    </div>
                </LoginForm>
            </div>
            {/* Footer组件 */}
        </div>
    );
};

export default Login;
