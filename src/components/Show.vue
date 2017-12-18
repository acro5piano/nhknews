<template>
  <div class="article-detail" :style="appClass">
    <p class="article-detail-title" :style="{ color: isNightMode ? '#fff' : '#444' }">{{ article.title }}</p>
    <p class="article-detail-body">{{ article.summary }}</p>
    <p class="article-detail-body" v-html="article.content"></p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'show',
  data () {
    return {
      article: {},
    }
  },
  mounted () {
    this.article = this.articles[this.$route.params.id] || {}
    window.scrollTo(0, 0)
  },
  computed: {
    ...mapState(['articles', 'isNightMode']),
    ...mapGetters(['appClass']),
  }
}
</script>

<style scoped>
.article-detail {
  background: #fff;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  font-size: 14px;
}
.article-detail-title {
  font-size: 16px;
  padding: 14px 12px 0;
}
.article-detail-body {
  padding: 0 12px;
}
.article-detail-title {
  font-size: 16px;
  padding: 0 12px;
  color: #444;
}
.article-detail-body {
  padding: 0 12px;
}
</style>
