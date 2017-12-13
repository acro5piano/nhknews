const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const AWS = require('aws-sdk')
AWS.config.region = 'us-east-1'
const s3 = new AWS.S3()
const cloudfront = new AWS.CloudFront()
const bucketName = 'nhknews';

exports.handler = function(event, context, callback) {
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
    const params = { Bucket: 'nhknews', Key: 'public/data.json', Body: JSON.stringify(articles) }
    s3.putObject(params, function(err, data) {
      if (err) {
        callback(err)
      }
      const cloudFrontParams = {
        DistributionId: 'E3O29DRB7JJ6T',
        InvalidationBatch: {
          CallerReference: Date.now(),
          Paths: {
            Quantity: 1,
            Items: [
              '/public/data.json',
            ]
          }
        }
      }
      cloudfront.createInvalidation(cloudFrontParams, function(err, data) {
        if (err) callback(err)
        else     callback(null, 'success')
      })
    })
  })
}
