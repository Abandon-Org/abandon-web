import {PageLoading, Settings as LayoutSettings} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from '@umijs/max';
import {history} from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import {errorConfig} from './requestErrorConfig';
import React from 'react';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    loading?: boolean;
}> {
    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem("AbandonToken");
            if (!token) {
                history.push(loginPath);
                return;
            }
        } catch (error) {
            history.push(loginPath);
        }
        return undefined;
    };
    // 如果不是登录页面，执行
    const {location} = history;
    if (location.pathname !== loginPath) {
        const currentUser = await fetchUserInfo();
        return {
            settings: defaultSettings,
        };
    }

    return {
        settings: defaultSettings,
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({}) => {
    return {
        siderWidth: 216,
        token: {
            colorBgAppListIconHover: 'rgba(0,0,0,0.06)',
            colorTextAppListIconHover: 'rgba(255,255,255,0.95)',
            colorTextAppListIcon: 'rgba(255,255,255,0.85)',
            sider: {
                colorBgCollapsedButton: '#fff',
                colorTextCollapsedButtonHover: 'rgba(0,0,0,0.65)',
                colorTextCollapsedButton: 'rgba(0,0,0,0.45)',
                colorMenuBackground: '#232137',
                colorBgMenuItemCollapsedHover: 'rgba(0,0,0,0.06)',
                colorBgMenuItemCollapsedSelected: 'rgba(0,0,0,0.15)',
                colorBgMenuItemCollapsedElevated: 'rgba(0,0,0,0.85)',
                colorMenuItemDivider: 'rgba(255,255,255,0.15)',
                colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
                colorBgMenuItemSelected: '#1670ff',
                colorTextMenuSelected: '#fff',
                colorTextMenuItemHover: 'rgba(255,255,255,0.75)',
                colorTextMenu: 'rgba(255,255,255,0.75)',
                colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
                colorTextMenuTitle: 'rgba(255,255,255,0.95)',
                colorTextMenuActive: 'rgba(255,255,255,0.95)',
                colorTextSubMenuSelected: '#fff',
            },
        },
        layoutBgImgList: [
            {
                src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
                left: 85,
                bottom: 100,
                height: '303px',
            },
            {
                src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
                bottom: -68,
                right: -45,
                height: '303px',
            },
            {
                src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
                bottom: 0,
                left: 0,
                width: '331px',
            },
        ],
        links: [],
        menuHeaderRender: undefined,
    };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
    ...errorConfig,
};
