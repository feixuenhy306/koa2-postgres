Environment: Node js, Webframework: KOA-2, Database: Postgres, Logging library: Pino

node verion: v7.10.0, npm version: 4.2.0, Postgres: PostgreSQL 9.5.6 on x86_64-pc-linux-gnu, compiled by gcc (Ubuntu 5.4.0-6ubuntu1~16.04.4) 5.4.0 20160609, 64-bit

# create user

curl -i localhost:3000/v1/signup -d '{"name":"rishabh chandel", "email":"ab@gmail.com", "passwd":"abc"}' -X POST -H 'Content-Type:application/json'

# signin user

curl -i localhost:3000/v1/signin -d '{ "email":"ab@mail.com","passwd":"abc"}' -X POST -H 'Content-Type:application/json'

# get all user:

curl -i localhost:3000/v1/users -X GET -H 'Content-Type:application/json' -H 'Authorization:Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiQGdtYWlsLmNvbSIsImlhdCI6MTUwNTgxMzEwNH0.o572JqD9ViMA6nD4OYO2zeQM6wMfPBcJDev8StDs69jmZr89koFMjmnUJpNyef2PsiZfkltULqGwD8zH9oKsPYZBGV9mVxCPJAYKwnlm_7aekhxnsiq6-CVv4p-BnmirD-HFUtTo7xwww066dSnp2q-y7FyCXeWHGz36rY2H8LRqa3-UrKHyyB9DH2K_pmRpJPkOGKEld8DizKmj8tzKvAbsBG12i8qWWJQnHlT0P8AD7amqAs7IIsRt3s_1AmI-GId-MQqKKFYx1GZ3Ipfy8jxASTicfXbpdKjBusI5e8df-9xIsoeAUhlYdq5VLHcHZYLj2YTi8KIEp5fh802ekw'

https://github.com/MaximAbramchuck/awesome-interview-questions#nodejs

https://www.vskills.in/practice/startPracticeTest/Node-JS-Mock-Test
http://www.expertrating.com/certifications/Node-js-Test.asp

http://es6-features.org/#RestParameter

https://www.linkedin.com/in/miguellgt

http://www.geeksforgeeks.org/?p=138711&preview=true
