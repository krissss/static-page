<template>
  <div>
    <input v-model="searchVal" type="text" placeholder="search" @change="search"/>
    <button @click="search">search</button>
  </div>
  <div>
    <div v-for="({item}, index) in result" :key="index">
      <div>{{ item.q }}</div>
      <div>{{ item.a }}</div>
    </div>
  </div>
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
      this.result = this.idx.search(this.searchVal)
    }
  },
  mounted() {
    this.initIdx()
  }
}
</script>

<style scoped>

</style>
