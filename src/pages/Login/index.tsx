import {GithubOutlined, LockOutlined, MailOutlined, MobileOutlined, UserOutlined} from '@ant-design/icons';
import {LoginForm, ProFormCheckbox, ProFormText} from '@ant-design/pro-form';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';

const Login: React.FC = () => {
    const [type, setType] = useState<string>('account');

    console.log(type)

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
                >
                    <Tabs activeKey={type} onChange={setType} centered>
                        <Tabs.TabPane key="account" tab="登录"/>
                        <Tabs.TabPane key="register" tab="注册"/>
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
