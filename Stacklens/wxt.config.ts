import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  outDir: 'dist',
  outDirTemplate: 'extension',
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'StackLens',
    version: '2.0.0',
    author: { email: 'contact@pawansimha.com' },
    description: 'See Beyond the Website - Detect, explain, and visualize the technology stack of any website.',
    permissions: ['storage', 'activeTab', 'webRequest', 'tabs'],
    host_permissions: ['<all_urls>'],
    action: {
      default_title: 'StackLens',
      default_icon: {
        32: '/icons/StackLens.png',
      },
    },
    icons: {
      32: '/icons/StackLens.png',
      48: '/icons/StackLens.png',
      128: '/icons/StackLens.png',
      256: '/icons/StackLens.png',
    },
    content_security_policy: {
      extension_pages:
        "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:",
    },
  },
});
