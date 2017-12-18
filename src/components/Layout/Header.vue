<template>
  <div class="menu" :style="appClass" v-if="isMenuOpened">
    <div class="menu-content">
      <div class="menu-content-item" v-if="page === ''" @click="page = 'about'">
        About
      </div>
      <div class="menu-content-item" v-if="page === ''" @click="$store.dispatch('toggleNightMode')">
        Night mode
      </div>
      <div class="menu-page" v-if="page === 'about'">
        <p class="menu-content-title">Fast news</p>
        <p class="menu-content-version">v0.0.1</p>
        <p class="menu-content-credit">
          <a class="menu-content-credit" href="https://github.com/acro5piano/" target="_blank">
            Kazuya Gosho
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'global-header',
  data () {
    return {
      page: '',
    }
  },
  computed: {
    ...mapState(['isMenuOpened']),
    ...mapGetters(['appClass']),
  },
  watch: {
    isMenuOpened (from, to) {
      this.page = ''
    }
  }
}

</script>
<style>
.menu {
  position: fixed;
  height: 100vh;
  margin-top: 48px;
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
.menu-content-item {
  width: 100%;
  text-align: left;
  padding: 24px;
  font-size: 14px;
  cursor: pointer;
}
</style>
