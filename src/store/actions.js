import * as types from './mutation_types.js'
import axios from 'axios'

export const getArticles = async ({ commit }) => {
  commit(types.START_LOADING)
  return new Promise((resolve) => {
    axios.get('/public/data.json').then((res) => {
      commit(types.SET_ARTICLES, res.data)
      commit(types.STOP_LOADING)
      resolve()
    })
  })
}

export const toggleMenu = ({ commit }) => {
  document.getElementsByTagName('body')[0].classList.toggle('lock')
  commit(types.TOGGLE_MENU)
}

export const toggleNightMode = ({ commit }) => {
  localStorage.setItem('is_night_mode', 'true')
  commit(types.TOGGLE_NIGHT_MODE)
}
