<template>
  <el-container class="container">
    <el-header>
      <p class="text-center">{{ title }}</p>
    </el-header>
    <el-main>
      <el-input
          v-model="searchVal"
          placeholder="search"
          :clearable="true"
          @input="search">
        <template #append>
          <el-button icon="el-icon-search" @click="search"></el-button>
        </template>
      </el-input>
      <div class="result" v-loading="loading">
        <div v-for="(item, index) in result" :key="index">
          <p v-html="item.q"></p>
          <p>答案：<span style="color: #67c23a">{{ item.a }}</span></p>
          <el-divider></el-divider>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import kejuJson from '../../../node/qnyh/keju.json'
import PinyinMatch from 'pinyin-match'

export default {
  name: "KeJu",
  data() {
    return {
      title: '倩女手游科举答题',
      searchVal: '',
      result: [],
      setTimeoutKey: null,
      loading: false
    }
  },
  methods: {
    search() {
      if (!this.searchVal) {
        return
      }
      this.loading = true
      clearTimeout(this.setTimeoutKey)
      this.setTimeoutKey = setTimeout(() => {
        this.searchReal()
        this.loading = false
      }, 500)
    },
    searchReal() {
      const result = []
      kejuJson.forEach(item => {
        const index = PinyinMatch.match(item.q, this.searchVal)
        if (index === false) {
          return
        }
        const highlight = item.q.substring(index[0], index[1] + 1)
        result.push({
          q: item.q.split(highlight).join(`<span style="color: red">${highlight}</span>`),
          a: item.a
        })
      })
      this.result = result
    },
  },
  mounted() {
    document.title = this.title
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
.result {
  min-height: 100px;
}
</style>
