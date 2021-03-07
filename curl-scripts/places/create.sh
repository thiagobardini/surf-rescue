#!/bin/bash

API="http://localhost:4741"
URL_PATH="/places"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
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
      "stance": "'"${STANCE}"'"
    }
  }'

echo

# LOCAL_NAME="TV" COUNTRY="Canada" LOCAL_IMG="<IMG>" SURF_LEVEL="easy" AVG_COST_D="100" TOKEN=8be50f1ff9845ab9e98a11cadd9fbb6f sh curl-scripts/places/create.sh
