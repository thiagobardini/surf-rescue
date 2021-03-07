# sh curl-scripts/index.sh

curl "http://localhost:4741/reviews/${REVIEW_ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}"
--data '{
    "review": {
      "title": "'"${TITLE}"'",
      "content": "'"${CONTENT}"'",
      "stars": "'"${STARS}"'",
      "placeId": "'"${PLACE_ID}"'"
    }
}'
