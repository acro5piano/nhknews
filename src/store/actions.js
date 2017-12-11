import * as types from './mutation_types.js'
import axios from 'axios'

export const getArticles = async ({ commit }) => {
  commit(types.STOP_LOADING)
  return new Promise(resolve => {
    axios.get('/public/data.json').then(res => {
      commit(types.SET_ARTICLES, res.data)
      commit(types.STOP_LOADING)
      resolve()
    })
  })
}

export const openMenu = ({ commit }) => {
  document.getElementsByTagName('body')[0].classList.toggle('lock')
  commit(types.OPEN_MENU)
}

export const closeMenu = ({ commit }) => {
  document.getElementsByTagName('body')[0].classList.toggle('lock')
  commit(types.CLOSE_MENU)
}
