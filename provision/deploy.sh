#!/bin/bash

yarn build
aws s3 sync --delete dist/ s3://nhknews/ --profile kazuya
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id E3O29DRB7JJ6T --paths '/*' --profile kazuya
