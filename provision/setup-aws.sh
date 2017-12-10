#!/bin/bash

export AWS_PROFILE=kazuya

set -ue

function s3() {
  aws s3api create-bucket --region ap-northeast-1 --acl public-read --bucket nhknews
  aws s3api put-bucket-acl --bucket nhknews --acl public-read
  aws s3api put-bucket-policy --bucket nhknews --policy file://provision/policy.json
}

function lambda() {
  aws iam create-role \
    --role-name nhknews \
    --path /service-role/ \
    --assume-role-policy-document file://$PWD/provision/role-policy-document.json \
    || true

  aws iam attach-role-policy \
    --role-name nhknews \
    --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess \
    || true

  aws iam attach-role-policy \
    --role-name nhknews \
    --policy-arn arn:aws:iam::aws:policy/AWSLambdaFullAccess \
    || true

  aws iam attach-role-policy \
    --role-name nhknews \
    --policy-arn arn:aws:iam::aws:policy/CloudWatchLogsFullAccess \
    || true

  aws lambda create-function \
    --region ap-northeast-1 \
    --function-name nhknews \
    --zip-file fileb://bundle.zip \
    --role arn:aws:iam::469546064325:role/service-role/nhknews \
    --handler scraper.handler \
    --runtime nodejs6.10

  rm bundle.zip
}

function bundle() {
  zip -r bundle.zip scraper.js \
    node_modules/{cheerio,inherits,domhandler,domelementtype,domutils,css-select,dom-serializer,entities,htmlparser2,lodash,parse5} \
    node_modules/{axios,follow-redirects,ms,is-buffer}
}

function lambda-deploy() {
  aws lambda update-function-code \
    --function-name nhknews \
    --zip-file fileb://bundle.zip

  aws lambda invoke \
    --function-name nhknews \
    /dev/stdin
}

# s3

bundle && \
  lambda-deploy && \
  rm bundle.zip
