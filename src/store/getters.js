export const appClass = state => {
  return {
    background: state.isNightMode ? '#888' : '#f7f7f7',
    transition: 'all linear 0.3s',
    color: state.isNightMode ? '#ddd' : '#666',
  }
}
