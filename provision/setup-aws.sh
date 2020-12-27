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

  aws iam attach-role-policy \
    --role-name nhknews \
    --policy-arn arn:aws:iam::aws:policy/CloudFrontFullAccess \
    || true
}
