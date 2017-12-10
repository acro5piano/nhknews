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

    zip -r bundle.zip scraper.js \
      node_modules/{css-select,dom-serializer,entities,htmlparser2,lodash,parse5} \
      node_modules/{axios,follow-redirects,is-buffer}

    aws lambda create-function \
        --region ap-northeast-1 \
        --function-name nhknews \
        --zip-file fileb://bundle.zip \
        --role nhknews \
        --handler scraper.handler \
        --runtime nodejs6.10

    rm bundle.zip
}

# s3
lambda
