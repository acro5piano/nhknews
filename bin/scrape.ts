#!/usr/bin/env node
require('dotenv').config({ systemvars: true })

import axios from 'axios'
import cheerio from 'cheerio'
import AWS from 'aws-sdk'
import bluebird from 'bluebird'
import fs from 'fs/promises'
import path from 'path'

const cloudfront = new AWS.CloudFront()

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

AWS.config.region = 'us-east-1'

interface NewsListItem {
  id: string
  title: string
  pubDate: string
  link: string
  imgPath: string
  iconPath: string
  videoPath: string
}

interface Article {
  title: string
  summary: string
  content: string
  createdAt: string
}

async function main() {
  const articles: Article[] = await bluebird
    .resolve(axios.get('http://www3.nhk.or.jp/news/json16/new_001.json'))
    .then((res) => res.data.channel.item)
    .map((item: NewsListItem) =>
      axios.get('http://www3.nhk.or.jp/news/' + item.link),
    )
    .map((res) => res.data)
    .map((html) => {
      const $ = cheerio.load(html)
      return {
        title: $('title').text(),
        summary: $('.content--summary').text(),
        content: $('.content--detail-more').html()?.replace(/\t/g, '')!,
        createdAt: $('.module--header time').attr('datetime')!,
      }
    })

  const params = {
    Bucket: 'nhknews',
    Key: 'public/data.json',
    Body: JSON.stringify(articles),
  }
  await s3.putObject(params).promise()

  fs.writeFile(
    path.resolve(__dirname, '../public/data.json'),
    JSON.stringify(articles),
  )

  await cloudfront
    .createInvalidation({
      DistributionId: 'E3O29DRB7JJ6T',
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: 1,
          Items: ['/public/data.json'],
        },
      },
    })
    .promise()
  console.log('success')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
