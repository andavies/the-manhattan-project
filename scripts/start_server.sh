export PATH=$PATH:/opt/bitnami/nodejs/bin/:/opt/bitnami/mongodb/bin/

cd ~/app
mongod --fork --logpath /var/log/mongod.log
npm install pm2 -g
pm2 start src/index.js