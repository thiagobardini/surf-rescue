#!/bin/bash

API="https://limitless-plateau-08641.herokuapp.com/"
URL_PATH="/sign-up"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo

# EMAIL="tv@tv" PASSWORD="tv" PASSWORD="tv" sh curl-scripts/auth/sign-up.sh