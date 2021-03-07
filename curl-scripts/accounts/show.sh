#!/bin/sh

API="http://localhost:4741"
URL_PATH="/accounts"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo

# TOKEN=04cd1fdc7946f6d66aa9d9f89134de17 sh curl-scripts/accounts/index.sh