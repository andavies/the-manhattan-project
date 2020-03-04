export PATH=$PATH:/opt/bitnami/nodejs/bin/:/opt/bitnami/mongodb/bin/


cd ~/app
sudo mongod --noauth --fork --logpath /var/log/mongod.log --logappend --dbpath /opt/bitnami/mongodb/data/db
sudo npm install forever -g
forever start src/index.js