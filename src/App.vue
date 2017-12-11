<template>
  <div id="app">
    <div class="header">
      <span class="header-menu" @click="$store.dispatch('openMenu')">
        <i class="material-icons">menu</i>
      </span>
      NHK News
    </div>
    <router-view></router-view>

    <div class="spinner" v-if="loading">
      loading...
    </div>

    <transition name="fade">
      <div class="menu" v-if="isMenuOpened">
        <div class="header">
          <span class="header-menu" @click="$store.dispatch('closeMenu')">
            <i class="material-icons">close</i>
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

  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  name: 'app',
  mounted () {
    this.$store.dispatch('getArticles')
  },
  filters: {
    toHumanTime (value) {
      return moment(value).format('M月D日 HH時mm分')
    }
  },
  computed: {
    ...mapState(['articles', 'loading', 'isMenuOpened'])
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
h1, h2 {
  font-weight: normal;
}
#app {
  line-height: 1.5;
  box-sizing: border-box;
}

.lock {
  overflow-y: hidden;
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
  top: 0;
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
