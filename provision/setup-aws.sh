#!/bin/bash

aws s3api create-bucket --region ap-northeast-1 --acl public-read --bucket nhknews
aws s3api put-bucket-acl --bucket nhknews --acl public-read
aws s3api put-bucket-policy --bucket nhknews --policy file://provision/policy.json

