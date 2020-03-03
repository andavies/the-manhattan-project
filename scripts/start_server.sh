export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  
# https://stackoverflow.com/questions/46048453/aws-codedeploy-command-not-found

cd ~/app
mongod --fork --logpath /var/log/mongod.log
npm start