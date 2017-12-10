<template>
  <div id="app">
    <div class="header">
      <span class="header-menu" @click="openMenu">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </span>
      NHK News
    </div>

    <transition name="fade">
      <div class="menu" v-if="isMenuOpened">
        <div class="header">
          <span class="header-menu" @click="closeMenu">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </div>
        <div class="menu-content">
          <p class="menu-content-title">Fast news</p>
          <p class="menu-content-version">v0.0.1</p>
          <p class="menu-content-credit">
            <a class="menu-content-credit" href="https://github.com/acro5piano/" target="_blank">
              Kazuya Gosho
            </a>
          </p>
        </div>
      </div>
    </transition>

    <div class="spinner" v-if="loading">
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    </div>

    <div class="article-container" v-if="! loading">
      <div class="article" v-for="(article, index) in articles" @click="openArticle(index)">
        <div class="article-title">
          {{ article.title }}
          <div class="article-created-at">
            {{ article.createdAt | toHumanTime }}
          </div>
        </div>
        <div class="article-content">
          {{ article.summary }}
        </div>
      </div>
    </div>

    <transition name="fade">
      <div class="article-detail" v-if="selectedArticleIndex !== false">
        <div class="header">
          <span class="header-menu" @click="closeArticle()">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </span>
        </div>
        <div class="article-detail-container">
          <p class="article-detail-title">{{ selectedArticle.title }}</p>
          <p class="article-detail-body">{{ selectedArticle.summary }}</p>
          <p class="article-detail-body" v-html="selectedArticle.content"></p>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'app',
  data () {
    return {
      articles: [],
      loading: true,
      isMenuOpened: false,
      selectedArticleIndex: false,
    }
  },
  mounted () {
    axios.get('/public/data.json').then(res => {
      this.articles = res.data
      this.loading = false
    })
  },
  methods: {
    openMenu () {
      this.isMenuOpened = true
      this.toggleScrollLockBody()
    },
    closeMenu () {
      this.isMenuOpened = false
      this.toggleScrollLockBody()
    },
    openArticle (index) {
      this.selectedArticleIndex = index
      this.toggleScrollLockBody()
    },
    closeArticle () {
      this.selectedArticleIndex = false
      this.toggleScrollLockBody()
    },
    toggleScrollLockBody () {
      document.getElementsByTagName('body')[0].classList.toggle('lock')
    }
  },
  filters: {
    toHumanTime (value) {
      return moment(value).format('M月D日 HH時mm分')
    }
  },
  computed: {
    selectedArticle () {
      return this.articles[this.selectedArticleIndex] || {}
    }
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
body.lock {
  overflow-y: hidden;
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
  margin-bottom: 10px;
  padding: 8px 12px;
  border-bottom: solid 1px #eee;
}
.article-created-at {
  color: #888;
  text-align: right;
  font-size: 10px;
  padding-top: 4px;
}
.article-content {
  padding: 0 12px 12px;
}

.article-detail {
  position: fixed;
  top: 0;
  background: #fff;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
}
.article-detail-container {
  margin-top: 54px;
}
.article-detail-title {
  font-size: 16px;
  padding: 14px 12px 0;
  color: #444;
}
.article-detail-body {
  padding: 0 12px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
