
curl "http://localhost:4741/reviews/${REVIEW_ID}" \
  --include \
  --request DELETE
  --header "Authorization: Bearer ${TOKEN}"
  --data '{
    "review": {
      "restaurantId": "'"${REST_ID}"'"
      }
   }'

  echo