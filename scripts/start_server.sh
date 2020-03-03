export PATH=$PATH:/opt/bitnami/nodejs/bin/:/opt/bitnami/mongodb/bin/

chmod +w ~/app
npm install
mongod --fork --logpath /var/log/mongod.log
sudo npm install forever -g
forever start src/index.js