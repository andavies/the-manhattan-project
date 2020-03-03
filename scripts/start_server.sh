export PATH=$PATH:/opt/bitnami/nodejs/bin/:/opt/bitnami/mongodb/bin/

npm install
mongod --fork --logpath /var/log/mongod.log
sudo npm install forever -g
forever start src/index.js