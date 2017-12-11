import * as types from './mutation_types.js'

export default {
  [types.SET_ARTICLES] (state, articles) {
    state.articles = articles
  },
  [types.START_LOADING] (state) {
    state.loading = true
  },
  [types.STOP_LOADING] (state) {
    state.loading = false
  },
  [types.OPEN_MENU] (state) {
    state.isMenuOpened = true
  },
  [types.CLOSE_MENU] (state) {
    state.isMenuOpened = false
  }
}
