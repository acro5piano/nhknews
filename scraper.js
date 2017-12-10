const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

exports.handler = function(event, context) {
  const articles = []

  new Promise(resolve => {
    axios.get('http://www3.nhk.or.jp/news/json16/new_001.json').then(res => {
      const items = res.data.channel.item
      Promise.all(items.map(item => {
        return new Promise(resolve => {
          let path = 'http://www3.nhk.or.jp/news/' + item.link
          axios.get(path).then(res => {
            const $ = cheerio.load(res.data)
            let news = {
              title: item.title,
              summary: $('#news_textbody').text(),
              content: $('#news_textmore').html().replace(/\t/g, ''),
              url: path,
              createdAt: $('.module--header time').attr('datetime'),
            }
            articles.push(news)
            resolve()
          })
        })
      })).then(() => {
        resolve()
      })
    })
  }).then(() => {
    fs.writeFile(__dirname + '/public/data.json', JSON.stringify(articles), err => err && console.log(err))
  })
}
