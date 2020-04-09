import Vue from 'vue'
import Vuex from 'vuex'
// 导入axios
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有数据
    list: [],
    inputValue: '',
    // 定义下一个id
    nextId: 5,
    // 高亮切换按钮状态
    viewKey: 'all'
  },
  mutations: {
    // 记住 mutatutions中的函数的参数第一个永远是state
    initList(state, list) {
      state.list = list
    },
    // val 外界传过来的值
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 添加item项
    addItem(state) {
      // 定义添加的新内容为一个对象结构
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      // 将输入框输入的值添加到数组中
      state.list.push(obj)
      // 让对象的id值+1
      state.nextId++
      // 输入之后清空输入框的值
      state.inputValue = ''
    },
    // 根据id值删除对应的数组
    removeItem(state, id) {
      // 1.查找对应的id值
      const i = state.list.findIndex(x =>
        x.id === id
      )
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 修改列表项的选中状态
    stateCheckedChange(state, params) {
      const i = state.list.findIndex(x =>
        x.id === params.id)
      if (i !== -1) {
        // 将复选框的status选中状态复制给store中的list列表中
        state.list[i].done = params.status
      }
    },
    // 清楚已完成的任务
    cleanDone(state) {
      // filter 会返回一个新数组
      state.list = state.list.filter(x => x.done === false)
    },
    // 切换高亮状态按钮
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    // 定义一个请求list.json数据格式的网络请求
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    // 统计没完成的任务个数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    // 切换全部,未完成,已完成,渲染列表
    infoList(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }

  },
  modules: {
  }
})
