import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import * as actions from './actions.js'
import * as getters from './getters.js'

Vue.use(Vuex)

const state = {
  articles: [],
  loading: true,
  isMenuOpened: false,
  isNightMode: localStorage.getItem('is_night_mode') === 'true',
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
