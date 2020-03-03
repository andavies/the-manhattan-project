export PATH=$PATH:/opt/bitnami/nodejs/bin/:/opt/bitnami/mongodb/bin/

cd ~/app
mongod --fork --logpath /var/log/mongod.log
npm start