const rp = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash')
const fs = require('fs');


rp.get('http://www3.nhk.or.jp/news/json16/new_001.json').then(htmlString => {
    const items = JSON.parse(htmlString).channel.item
    items.forEach(item => {
      let path = 'http://www3.nhk.or.jp/news/' + item.link
      rp.get(path).then(newsString => {
        const $ = cheerio.load(newsString)
        let news = {
          title: item.title,
          content: $('article.module--detail').text().replace(/\t/g, ''),
          url: path
        }
        fs.writeFile(__dirname + '/public/data.json', JSON.stringify(news), err => err && console.log(err))
      })
    })
  })
