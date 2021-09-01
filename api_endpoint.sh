curl --request GET \
  --url http://127.0.0.1:3000/api/v1/tours \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjg0YTQzMjljMGU3NDA5OGJkMDc2YyIsImlhdCI6MTYyODg2NTMzMSwiZXhwIjoxNjM2NjQxMzMxfQ.D-Pr03XCwChPpeQZPiEJ4c4XQ-YRu5pbeBUPRnIGNGs'\
  | jq

curl --request POST \
	--url http://127.0.0.1:3000/api/v1/users/login \
	--header 'Content-Type: application/json' \
	--data '{ "email": "new@teeet.com", "password": "12343457hhhykky" }'\
	| jq

