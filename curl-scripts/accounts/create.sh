#!/bin/bash

API="http://localhost:4741"
URL_PATH="/accounts"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "account": {
      "name": "'"${NAME}"'",
      "surfLevel": "'"${SURF_LEVEL}"'",
      "budget": "'"${BUDGET}"'"
    }
  }'

echo

# NAME="Thiago Bardini" SURF_LEVEL="Intermediary" BUDGET="1000" TOKEN=9050315f7ca93876cd77c174ea1b8f66a sh curl-scripts/accounts/create.sh