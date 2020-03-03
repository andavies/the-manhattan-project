export PATH=$PATH:/opt/bitnami/nodejs/bin/npm:/opt/bitnami/mongodb/bin/mongod

cd ~/app
mongod --fork --logpath /var/log/mongod.log
npm start