<template>
  <div id="app">
    <div class="article" v-for="article in articles">
      <div class="article-title">
        {{ article.title }}
      </div>
      <div class="article-content">
        {{ article.content }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      articles: []
    }
  },
  mounted () {
    axios.get('/public/data.json').then(res => {
      this.articles = res.data
    })
  }
}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
  font-size: 12px;
  background: #f7f7f7;
  line-height: 1.5;
  box-sizing: border-box;
}

h1, h2 {
  font-weight: normal;
}

.article {
  margin: 8px 8px 12px;
  border: solid 1px #ccc;
  padding: 8px 12px;
  border-radius: 3px;
  word-wrap: break-word;
  background: #fff;
}

.article-title {
  font-size: 16px;
  margin-bottom: 12px;
}
.article-content {

}
</style>
