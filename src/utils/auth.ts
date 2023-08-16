import { message, notification } from 'antd';
import type { AbandonResponse } from '@/services/user';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { RequestOptions } from '@@/plugin-request/request';

// 定义 Headers 接口，用于设置请求头
interface Headers {
  token: string;
  'Content-Type'?: string;
}

// 定义 NotificationUtil 接口，用于封装通知和响应处理逻辑
interface NotificationUtil {
  headers: (json?: boolean) => RequestOptions;
  notificationResponse: (
      res: AbandonResponse,
      info?: boolean,
      position?: NotificationPlacement
  ) => boolean;
  response: (res: AbandonResponse, info?: boolean) => boolean;
  getUserMap: () => Promise<Record<any, any>>;
}

// 实现 NotificationUtil 接口
const notificationUtil: NotificationUtil = {
  // 设置请求头
  headers: (json = true): RequestOptions => {
    const token = localStorage.getItem('AbandonToken') || '';
    const header: Headers = { token };
    if (json) {
      header['Content-Type'] = 'application/json';
    }
    return header;
  },
  // 处理通知显示逻辑
  notificationResponse: (
      res: AbandonResponse,
      info = false,
      position: NotificationPlacement = 'topRight'
  ): boolean => {
    if (!res || res.code === undefined) {
      notification.error({
        message: '网络开小差了，请稍后重试',
        placement: position,
      });
      return false;
    }
    if (res.code === 200) {
      if (info) {
        notification.success({
          message: res.msg,
          placement: position,
        });
      }
      return true;
    }
    notification.error({
      message: res.msg,
      placement: position,
    });
    return false;
  },
  // 处理响应逻辑，包括显示消息通知
  response: (res: AbandonResponse, info = false): boolean => {
    if (!res || res.code === undefined) {
      message.error('网络开小差了，请稍后重试');
      return false;
    }
    if (res.code === 200) {
      if (info) {
        message.success(res.msg);
      }
      return true;
    }
    message.error(res.msg);
    return false;
  },
};

export default notificationUtil;
