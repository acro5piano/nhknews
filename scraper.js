const rp = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash')
const fs = require('fs');

const articles = []

new Promise(resolve => {
  rp.get('http://www3.nhk.or.jp/news/json16/new_001.json').then(htmlString => {
    const items = JSON.parse(htmlString).channel.item
    Promise.all(items.map(item => {
      return new Promise(resolve => {
        let path = 'http://www3.nhk.or.jp/news/' + item.link
        rp.get(path).then(newsString => {
          const $ = cheerio.load(newsString)
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
