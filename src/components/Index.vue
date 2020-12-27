<template>
  <div id="app">
    <div class="article-container">
      <div
        class="article"
        :style="articleStyle"
        v-for="(article, index) in articles"
        @click="$router.push('/articles/' + index)"
      >
        <div
          class="article-title"
          :style="{ 'border-color': isNightMode ? '#888' : '#eee' }"
        >
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
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: 'index',
  data() {
    return {
      isMenuOpened: false,
      selectedArticleIndex: false,
    }
  },
  filters: {
    toHumanTime(value) {
      return dayjs(value).format('M月D日 HH時mm分')
    },
  },
  computed: {
    ...mapState(['articles', 'isNightMode']),
    articleStyle() {
      return {
        background: this.isNightMode ? '#111' : '#fff',
        'border-color': this.isNightMode ? '#666' : '#ccc',
      }
    },
  },
}
</script>

<style>
.article-container {
  padding-top: 12px;
}
.article {
  margin: 0 8px 12px;
  border: solid 1px #ccc;
  border-radius: 3px;
  word-wrap: break-word;
  background: #fff;
  cursor: pointer;
}
.article-title {
  font-size: 18px;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-bottom: solid 1px;
}
.article-created-at {
  color: #888;
  text-align: right;
  font-size: 14px;
  padding-top: 4px;
}
.article-content {
  padding: 0 12px 12px;
  font-size: 16px;
}
</style>
