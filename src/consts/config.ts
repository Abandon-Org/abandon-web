import defaultSettings from "../../config/defaultSettings";
const isDev = () => {
  return window.location.href.indexOf("localhost") > -1 || window.location.href.indexOf("127.0.0.1") > -1;
}

const dev = isDev()

const getUrl = () => {
  if (defaultSettings.apiUrl) {
    return defaultSettings.apiUrl;
  }
  return 'http://localhost:9923'
}

const URL = getUrl();

const CONFIG = {
  URL,
  ROLE: {
    0: 'user',
    1: 'admin',
    2: 'superAdmin',
  },
  USER_ROLE: {
    0: '普通用户',
    1: '组长',
    2: '超级管理员',
  },
  USER_ROLE_TAG: {
    0: 'default',
    1: 'blue',
    2: 'success',
  },
  LAYOUT: {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  },
}

export default CONFIG;
