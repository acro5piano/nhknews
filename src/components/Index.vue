<template>
  <div id="app">
    <div class="article-container">
      <div class="article" v-for="(article, index) in articles" @click="$router.push('/articles/' + index)">
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
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  name: 'index',
  data () {
    return {
      isMenuOpened: false,
      selectedArticleIndex: false,
    }
  },
  filters: {
    toHumanTime (value) {
      return moment(value).format('M月D日 HH時mm分')
    }
  },
  computed: {
    ...mapState(['articles'])
  }
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
</style>

