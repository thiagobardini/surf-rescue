#!/bin/bash

API="http://localhost:4741"
URL_PATH="/accounts"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "account": {
      "name": "'"${NAME}"'",
      "hometown": "'"${HOMETOWN}"'",
      "surfLevel": "'"${SURF_LEVEL}"'",
      "avgBudgetDay": "'"${AVG_BUDGET_DAY}"'",
      "waveRange": "'"${WAVE_RANGE}"'",
      "stance": "'"${STANCE}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

echo

# NAME="Test" COUNTRY="Floripa" SURF_LEVEL="Intermediary" AVG_BUDGET_DAY=100 TOKEN=ce743ff1696e9b2c80888c246f7a4cf7 sh curl-scripts/accounts/update.sh