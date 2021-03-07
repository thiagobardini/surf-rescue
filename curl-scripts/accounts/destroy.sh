#!/bin/bash

API="http://localhost:4741"
URL_PATH="/accounts"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo

# TOKEN=ce743ff1696e9b2c80888c246f7a4cf7 sh curl-scripts/accounts/destroy.sh