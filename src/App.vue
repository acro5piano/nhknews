<template>
  <div id="app">
    <div class="header">
      aaa
    </div>

    <div class="spinner" v-if="loading">
      <mt-spinner color="#33bd2a" type="snake"></mt-spinner>
    </div>

    <div class="article-container" v-else>
      <div class="article" v-for="article in articles">
        <div class="article-title">
          {{ article.title }}
        </div>
        <div class="article-content">
          {{ article.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Spinner } from 'mint-ui';

Vue.component(Spinner.name, Spinner);

export default {
  name: 'app',
  data () {
    return {
      articles: [],
      loading: true

    }
  },
  mounted () {
    axios.get('/public/data.json').then(res => {
      this.articles = res.data
      this.loading = false
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
}

#app {
  line-height: 1.5;
  background: #f7f7f7;
  box-sizing: border-box;
}

h1, h2 {
  font-weight: normal;
}

.header {
  height: 48px;
  background: #33bd2a;
  position: fixed;
  top: 0;
  width: 100%;
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0,0,0,.15);
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.article-container {
  padding-top: 60px;
}

.article {
  margin: 0 8px 12px;
  border: solid 1px #ccc;
  border-radius: 3px;
  word-wrap: break-word;
  background: #fff;
}

.article-title {
  font-size: 16px;
  margin-bottom: 12px;
  padding: 8px 12px;
  border-bottom: solid 1px #eee;
}
.article-content {
  padding: 4px 12px;
}
</style>
