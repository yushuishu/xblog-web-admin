# vue3-admin

<p>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/badge/node-%3E=18.0.0-green.svg" alt="node compatility"></a>
</p>

## 介绍

项目基于 [vue@3.x](https://v3.cn.vuejs.org/guide) 系列开发（文档：[router@4.x](https://next.router.vuejs.org/zh/guide/index.html)、[pinia@4.x](https://pinia.web3doc.top/)），UI 组件库使用 [element-plus](https://element-plus.gitee.io/zh-CN/)，开发环境使用 [vite@2.x](https://cn.vitejs.dev/)。


## 预览
## 项目结构说明

```
├── mock                     # 开发模式下的模拟接口，预览模式下使用的fastmock
├── public
│   ├── static               # 静态引用资源
│   └── favicon.ico          # Favicon
├── src
│   ├── apis                 # 接口请求封装方法
│   ├── assets
│   ├── components           # 业务通用组件
│   ├── config               # 项目中的配置
│   ├── layouts              # 通用布局
│   ├── router               # vue路由配置
│   ├── store                # vuex配置
│   ├── styles               # 全局样式
typing # ts 类型申明文件
│   ├── utils                # 工具库
│   └── views                # 业务页面
├── .env                     # 公共的环境常量
├── .env.development         # 开发环境下的环境常量
├── .env.preview             # 预览模式下的环境常量
├── .env.production          # 生产环境下的环境常量
├── .eslintignore            # eslint忽略项配置
├── .gitignore
├── .prettierignore          # prettier忽略项配置
├── index.html               # vite规范的入口文件
├── LICENSE
├── package.json
├── tsconfig.json            # ts config
├── README.md
├── vite.config.ts           # vite配置文件
└── yarn.lock                # 当前版本的lock
```