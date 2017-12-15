<template>
  <div id="app">
    <div class="header">
      <span class="header-menu-icon" @click="$store.dispatch('toggleMenu')" v-if="$route.name !== 'show'">
        <i class="material-icons" v-if="! isMenuOpened && $route.path === '/'">menu</i>
        <i class="material-icons" v-if="isMenuOpened && $route.path === '/'">close</i>
        <i class="material-icons" v-if="isMenuOpened && $route.path === '/about'">close</i>
      </span>
      <span class="header-menu-icon" @click="$router.back()" v-else>
        <i class="material-icons" v-if="$route.name === 'show'">arrow_back</i>
      </span>
      <span v-if="! isMenuOpened && $route.path === '/'">
        NHK News
      </span>
    </div>
    <router-view></router-view>

    <div class="spinner" v-if="loading">
      loading...
    </div>

    <transition name="fade">
      <global-header></global-header>
    </transition>

  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import globalHeader from './components/Layout/Header.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components : {
    globalHeader
  },
  data () {
    return {
      loading: true
    }
  },
  async mounted () {
    await this.$store.dispatch('getArticles')
    this.loading = false
  },
  filters: {
    toHumanTime (value) {
      return moment(value).format('M月D日 HH時mm分')
    }
  },
  computed: {
    ...mapState(['articles', 'isMenuOpened'])
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
.header-menu-icon {
  margin-right: 16px;
  font-size: 22px;
  padding: 6px;
  cursor: pointer;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
