<template>
  <div>
    <div class="article-detail">
      <p class="article-detail-title">{{ article.title }}</p>
      <p class="article-detail-body">{{ article.summary }}</p>
      <p class="article-detail-body" v-html="article.content"></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'show',
  data () {
    return {
      article: {},
      loading: true,
    }
  },
  mounted () {
    this.article = this.articles[this.$route.params.id] || {}
  },
  computed: {
    ...mapState(['articles'])
  }
}
</script>

<style scoped>
.article-detail {
  background: #fff;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
}
.article-detail-title {
  font-size: 16px;
  padding: 14px 12px 0;
  color: #444;
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


