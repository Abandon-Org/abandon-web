import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
// 声明一个常量 Settings，用于配置 Umi 项目的布局和其他设置
const Settings: LayoutSettings & {
  pwa?: boolean; // 是否开启 Progressive Web App（渐进式网络应用）
  logo?: string; // 设置项目的 Logo 图片
  apiUrl?: string; // 设置项目的 API 地址
  wssUrl?: string; // 设置 WebSocket 地址
} = {
  navTheme: 'light', // 导航栏主题，这里设置为 'light'，即亮色主题
  // 拂晓蓝，用于设置页面的主色调，这里设置为 '#1677ff'
  colorPrimary: '#1677ff',
  layout: 'side', // 页面布局样式，这里设置为 'side'，即侧边栏布局
  contentWidth: 'Fluid', // 内容区域宽度，这里设置为 'Fluid'，即自适应宽度
  fixedHeader: false, // 是否固定顶部导航栏，这里设置为 false，即不固定
  fixSiderbar: true, // 是否固定侧边栏，这里设置为 true，即固定侧边栏
  colorWeak: false, // 是否开启色弱模式，这里设置为 false，即不开启
  logo: 'logo.svg', // 设置项目的 Logo 图片，路径为 'logo.svg'
  title: '测试平台', // 设置项目的标题
  pwa: false, // 是否开启 Progressive Web App（渐进式网络应用），这里设置为 false，即不开启
};


export default Settings;
