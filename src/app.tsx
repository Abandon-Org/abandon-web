import {PageLoading, Settings as LayoutSettings} from '@ant-design/pro-components';
import {history} from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import {errorConfig} from './requestErrorConfig';
import React from 'react';
import {currentUser as queryCurrentUser, LoginUser} from './services/auth';
import {message} from "antd";
import CONFIG from "../config/server_config";

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    currentUser?: LoginUser;
    loading?: boolean;
    fetchUserInfo?: () => Promise<LoginUser | undefined>;
}> {
    const fetchUserInfo = async () => {
        // 定义一个异步函数 fetchUserInfo，用于获取用户信息。
        try {
            const token = localStorage.getItem(CONFIG.JWT_KEY);
            // 从本地存储（localStorage）中获取名为 "AbandonToken" 的令牌。
            if (!token) {
                // 检查令牌是否存在。如果令牌不存在，使用 history.push(loginPath) 将页面重定向到登录页。
                history.push(CONFIG.LOGIN_PATH);
                return;
            }
            const msg = await queryCurrentUser({token});
            //使用获取到的令牌调用 queryCurrentUser 函数来获取用户信息。
            if (msg.code !== 200) {
                //检查返回的用户信息中的状态码是否为 200。如果不是 200，显示信息提示，并抛出错误。
                message.info(msg.msg);
                throw msg.msg;
            }
            return msg.data;
        } catch (error) {
            //捕获可能出现的错误。将页面重定向到登录页。
            history.push(CONFIG.WEB_URL+CONFIG.LOGIN_PATH);
        }
        return undefined;
    };
    // 如果不是登录页面，执行
    const {location} = history;
    if (location.pathname !== CONFIG.LOGIN_PATH) {
        const currentUser = await fetchUserInfo();
        return {
            fetchUserInfo,
            currentUser,
            settings: defaultSettings,
        };
    }

    return {
        fetchUserInfo,
        settings: defaultSettings,
    };
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
    ...errorConfig,
};
