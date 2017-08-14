Environment: Node js, Webframework: KOA-2, Database: Postgres, Logging library: Pino

node verion: v7.10.0, npm version: 4.2.0, Postgres: PostgreSQL 9.5.6 on x86_64-pc-linux-gnu, compiled by gcc (Ubuntu 5.4.0-6ubuntu1~16.04.4) 5.4.0 20160609, 64-bit

# create user

curl -i localhost:3000/v1/signup -d '{"name":"rishabh chandel", "email":"ab@gmail.com", "passwd":"abc"}' -X POST -H 'Content-Type:application/json'

# signin user

curl -i localhost:3000/v1/signin -d '{ "email":"ab@mail.com","passwd":"abc"}' -X POST -H 'Content-Type:application/json'

# get all user:

curl -i localhost:3000/v1/users -X GET -H 'Content-Type:application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJjQGdtYWlsLmNvbSIsImlhdCI6MTQ5NjA1Nzk0NH0.q8rdGb5VMCgwAJJzgxmYecj3O-oBO9uH_D_I54MiNNU'

https://github.com/MaximAbramchuck/awesome-interview-questions#nodejs

https://www.vskills.in/practice/startPracticeTest/Node-JS-Mock-Test
http://www.expertrating.com/certifications/Node-js-Test.asp
