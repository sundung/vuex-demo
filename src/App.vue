<template>
  <div id="app">
    <a-input placeholder="请输入任务"
             :value='inputValue'
             @change="handleChange"
             class="my_ipt" />
    <a-button type='primary'
              @click='addAction'>添加事项</a-button>
    <a-list bordered
            :dataSource='infoList'
            class="dt_list">
      <a-list-item slot="renderItem"
                   slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked='item.done'
                    @change='(e)=>{
          checkedChange(e,item.id)
        }'>{{item.info}}</a-checkbox>
        <!-- 删除连接 -->
        <a slot='actions'
           @click='removeItemById(item.id)'>删除</a>
      </a-list-item>
      <!-- footer区域 -->
      <div slot='footer'
           class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type='viewKey === "all"?"primary":"default"'
                    @click='changeList("all")'>全部</a-button>
          <a-button :type='viewKey === "undone"?"primary":"default"'
                    @click='changeList("undone")'>未完成</a-button>
          <a-button :type='viewKey === "done"?"primary":"default"'
                    @click='changeList("done")'>已完成</a-button>
        </a-button-group>
        <!-- 把已完成的任务清空 -->
        <a @click='clean'> 清楚已完成</a>
      </div>

    </a-list>

  </div>
</template>

<script>
// 导入 mapstate
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'App',
  data() {
    return {

    }
  },
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    // 展开store中的数据
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  methods: {
    handleChange(e) {
      console.log(e.target.value)
      this.$store.commit('setInputValue', e.target.value)
    },
    // 点击添加待办事项
    addAction() {
      if (this.inputValue.trim() <= 0) {
        return this.$message.warning('文本框内容不能为空,请输入内容')
      }
      // 触发vuex中的mutations中的函数(同步)
      this.$store.commit('addItem')
    },
    // 根据id值删除列表的列表项
    removeItemById(id) {
      console.log(id)
      // 触发vuex中的mutations中的函数(同步)
      this.$store.commit('removeItem', id)
    },
    // 监听复选框选中状态的变化事件
    checkedChange(e, id) {
      // e.target.checked可以拿到最新的选中状态
      console.log(e.target.checked)
      const params = {
        id: id,
        status: e.target.checked
      }
      // 触发vuex中的mutations中的函数(同步)
      this.$store.commit('stateCheckedChange', params)
    },
    // 点击按钮清楚已完成的任务
    clean() {
      // 触发vuex中的mutations中的函数(同步)
      this.$store.commit('cleanDone')
    },
    // 点击切换高亮按钮 --- 全部,未完成,已完成
    changeList(key) {
      console.log(key)
      // 触发vuex中的mutations中的函数(同步)
      this.$store.commit('changeViewKey', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
