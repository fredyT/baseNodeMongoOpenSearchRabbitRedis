# baseNodeMongoOpenSearchRabbitRedis
## This repo is to have a our base docker-compose and dockerfile that has a simple express app, mongoDB, opensearch, redis, passport all working.

## minimal code to make sure they are all communicating. The ides is to take this  docker-compose and dockerfile and add it to our other project.

There is a postman export that can be import into postman.
It has 7 endpont calls. baseNodeMongoOpenSearchRabbitRedis.postman_collection.json

On get / is just a hello world to check.
There are 4 post that will create contentType in mongo as well as index them in opensearch. The first 3  endpoints use the endpont that indexs in opensearch directly from the api call.

The 4 post that says rabbit test  is the one where you need to make sure you look at the notes below before you try it. This one is an example where the endpoint puts an item on the queue and the standalone process picks it ups and indexes it in open search. 

#The opensearch build can be tempermental for sure. I would do a docker-compose up --build and watch. make sure it comes up and you don't see things complaining about not being able to connecto to opensearch. Once the build is good you should be able stop and start with docker desktop.

The get list call is  using mongo db find.
The /search call is returning from opensearch.

##localhost:15672 is the rabbitMq console guest:guest
##localhost:5601 is the opensearch admin:admin

emainstreet is the name of the mongodb. You can use your favoarite monogdb client to check it out after you add things.
On the default localhost monog port.

##NOTE: to do the rabbitMQ test you will need to create a queue.
To create a queue go to rabbit console and the queue tab.
The Queue name is ### openSearchMessage enter openSearchMessage in the queue name field and right now we are using the classic style of queue.

The next thing you will need to do is login to the api container and start the monitoring job that will monitor rabbitMQ.

docker ps  command will get you a list of running container look for the api containers ID.
docker exec -it <container_id> /bin/sh

You should be in the /usr/src/app directory root of the node app.
Start up the monitorSearchQueue.js
node monitorSearchQueue.js 

When you hit the post man that that is a post that say testing MQ you will see a message print out in the container. 

##Another note: opensearch sometimes take longer to come up than other so you might have to retry a few post.


