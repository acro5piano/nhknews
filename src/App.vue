<template>
  <div id="app">
    <div class="header">
      <span class="header-menu" @click="isMenuOpened = true">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </span>
      NHK News
    </div>

    <transition name="fade">
      <div class="menu" v-if="isMenuOpened">
        <div class="header">
          <span class="header-menu" @click="isMenuOpened = false">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </div>
        <div class="menu-content">
          <p class="menu-content-title">Fast news</p>
          <p class="menu-content-version">v0.0.1</p>
          <p class="menu-content-credit">Kazuya Gosho</p>
        </div>
      </div>
    </transition>

    <div class="spinner" v-if="loading">
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
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

export default {
  name: 'app',
  data () {
    return {
      articles: [],
      loading: true,
      isMenuOpened: false,
    }
  },
  mounted () {
    axios.get('/public/data.json').then(res => {
      this.articles = res.data
      this.loading = false
    })
  },
  methods: {
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
  margin-top: 48px;
  background: #f7f7f7;
}

#app {
  line-height: 1.5;
  box-sizing: border-box;
}

h1, h2 {
  font-weight: normal;
}

.header {
  height: 48px;
  background: #33bd2a;
  border-bottom: solid 1px #33bd2a;
  position: fixed;
  top: 0;
  width: 100%;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0,0,0,.25);
  padding: 0 12px;
}
.header-menu {
  margin-right: 16px;
  font-size: 22px;
  padding: 6px;
}

.menu {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: #fff;
}
.menu-content {
  padding-top: 30vh;
  text-align: center;
  height: 80vh;
}
.menu-content-title {
  font-size: 20px;
  color: #333;
}
.menu-content-credit {
  padding-top: 24px;
  font-size: 12px;
  color: #888;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.article-container {
  padding-top: 12px;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
