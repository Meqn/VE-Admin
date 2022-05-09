import { createStore, queryModules } from '@/store'

// 注册 ./modules 目录下的所有模块
const modulesContext = require.context('./modules', true, /\.js$/)
const modules = queryModules(modulesContext)

export default createStore({ modules })
