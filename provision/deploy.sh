#!/bin/bash

export AWS_PROFILE=kazuya

yarn build
aws s3 sync --delete dist/ s3://nhknews/
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id E3O29DRB7JJ6T --paths '/*'
