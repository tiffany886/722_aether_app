import Vue from 'vue'
import { Button } from 'element-ui'
// 登录组件表单
import { Form, FormItem, Input } from 'element-ui'
// 消息弹框
import { Message } from 'element-ui'
// 全局注册组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 将弹框组件挂载到全局组件上
Vue.prototype.$message = Message