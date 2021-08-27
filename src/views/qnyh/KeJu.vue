<template>
  <el-container>
    <el-header>
      <el-input
          v-model="searchVal"
          placeholder="search"
          :clearable="true"
          @change="search">
        <template #append>
          <el-button icon="el-icon-search" @click="search"></el-button>
        </template>
      </el-input>
    </el-header>
    <el-main>
      <el-timeline>
        <el-timeline-item
            v-for="({item}, index) in result"
            :key="index"
            :timestamp="item.a">
          {{ item.q }}
        </el-timeline-item>
      </el-timeline>
    </el-main>
  </el-container>
</template>

<script>
import kejuJson from '../../../node/qnyh/keju.json'
import Fuse from 'fuse.js'

export default {
  name: "KeJu",
  data() {
    return {
      searchVal: '',
      idx: null,
      result: []
    }
  },
  methods: {
    initIdx() {
      const options = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        keys: [
          'q',
          'py'
        ]
      };

      this.idx = new Fuse(kejuJson, options);
    },
    search() {
      if (!this.searchVal) {
        return
      }
      this.result = this.idx.search(this.searchVal).slice(0, 30)
    }
  },
  mounted() {
    this.initIdx()
  }
}
</script>

<style scoped>

</style>
