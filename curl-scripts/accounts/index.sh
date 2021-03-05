#!/bin/sh

API="http://localhost:4741"
URL_PATH="/accounts"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo

# TOKEN=050315f7ca93876cd77c174ea1b8f66a sh curl-scripts/accounts/index.sh