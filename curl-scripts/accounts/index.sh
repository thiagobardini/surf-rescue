#!/bin/sh

API="http://localhost:4741"
URL_PATH="/accounts"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo

# TOKEN=29420481cfa63cb7a60fa98be102e49f sh curl-scripts/accounts/index.sh