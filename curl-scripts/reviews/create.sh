curl "http://localhost:4741/reviews" \
   --include \
   --request POST \
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

echo
