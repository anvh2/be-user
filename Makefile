TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInVzZXJuYW1lIjoiYW52aDIiLCJpYXQiOjE1NzUzMDEwNTZ9.h8a5Y4sW9E10Sa42lhE2mLc8rxoCZidN5o5ExKPA5w8"
DOMAIN = "https://wusbeuser.herokuapp.com"
DOMAIN-x = http://localhost:55210
	
curl-register:
	curl --header "Content-Type: application/json" \
	--request POST \
  	--data '{"username":"anvh2","password":"123", "email":"anvo.ht209@gmail.com","address":"TPHCM","name":"An","phone":"123456","dob":"1998-10-21","cardID":"1234567","gender":"Nam","avatar":"http://localhost:55210/public/default-avatar","role":"1"}' \
  	${DOMAIN}/users/register

curl-login:
	curl --header "Content-Type: application/json" \
	--request POST \
  	--data '{"username":"anvh2","password":"123"}' \
  	${DOMAIN}/users/login

curl-profile:
	curl -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" \
	--request GET \
	${DOMAIN}/users/profile

curl-update-profile: 
	curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" \
	--request POST \
	--data '{"address":"Nha Be - TPHCM","name":"Vo Hoang An","phone":"123456","dob":"1998-10-21","gender":"Nam","avatar":"http://localhost:55210/public/default-avatar"}' \
   ${DOMAIN}/users/updateprofile

curl-update-password: 
	curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" \
	--request POST \
	--data '{"password":"123", "email":"anvo.ht209@gmail.com"}' \
   ${DOMAIN}/users/updatepassword

curl-update-avatar:
	curl -H 'Content-Type: application/json' -H "Authorization: Bearer ${TOKEN}" \
	--request POST \
   ${DOMAIN}/users/updateavatar

curl: curl-register curl-login curl-profile curl-update-profile curl-update-password

deploy:
	git push heroku master

logs: 
	heroku logs --tail
	# log live: -t
	# log n row: -n 1000

restart:
	heroku restart