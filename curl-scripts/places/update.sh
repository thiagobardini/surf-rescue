#!/bin/bash

API="http://localhost:4741"
URL_PATH="/places"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "place": {
      "localName": "'"${LOCAL_NAME}"'",
      "country": "'"${COUNTRY}"'",
      "localImg": "'"${LOCAL_IMG}"'",
      "description": "'"${DESCRIPTION}"'",
      "surfLevel": "'"${SURF_LEVEL}"'",
      "avgCostDay": "'"${AVG_BUDGET_DAY}"'",
      "waveRange": "'"${WAVE_RANGE}"'",
      "stance": "'"${STANCE}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

echo
