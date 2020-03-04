export PATH=$PATH:/opt/bitnami/nodejs/bin/:/opt/bitnami/mongodb/bin/


cd ~/app
mongod --noauth --fork --logpath /var/log/mongod.log
sudo npm install forever -g
forever start src/index.js