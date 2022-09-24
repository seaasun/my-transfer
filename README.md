# 快转
一个可以进行自定义交易的DAPP，[预览](https://seaasun.github.io/my-transfer/)

## 快速开始

### `yarn start` 

启动CRA启动， 更多见[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)

### `yarn build`

本地构建
### `yarn deploy` 

使用gh-pages部署， 更多见[https://github.com/gitname/react-gh-pages](https://github.com/gitname/react-gh-pages)


## 主要目录结构
```
src
  |- components         组件
  |   |-Step1Hello      首页
  |   |-Step2Memo       输入助记词
  |   |-Step3Trade      交易的页面
  |   |-Box             代替div，支持css in js
  |   |-ErrorModal      全局的错误弹窗
  |   |-...             略
  |- constans           常量
  |- lab                测试、实验用的代码
  |- stroes             状态管理
  |   |- chains         网络
  |   |- web3Provider   保存ethereum创建的实例
  |   |- sender         发送人有关的信息
  |   |- transaction    交易信息，数额，收信人等
  |- utils              工具
  |- App.tsx            APP入口
  |- index.tsx          入口
  |- ...                略
```

## 主要技术栈

React, Typescript

[ethers](https://seaasun.github.io/my-transfer/) 

[Valito](https://valtio.pmnd.rs/) 状态管理 

[immer](immerjs/immer) 不可变数据

[NextUI](https://nextui.org/) UI组件