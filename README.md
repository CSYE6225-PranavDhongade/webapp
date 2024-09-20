# WebApp

# Steps
## Install Node.js
Ensure that you have Node.js installed on your machine. If not, you can download it from [Node.js official website](https://nodejs.org/).
Verify the installation by running the following commands:
```
node -v
npm -v
```
## Clone the Repository
Clone the repository to your local machine:
```
git clone https://github.com/pranavdhongadeapp/webapp
cd webapp
```

## Install Dependencies
This will install all the necessary dependencies and also the dev dependencies
```
npm install
```

## Run Tests
This command will run all the tests and make sure the API is working correctly 
```
npm run test
```

## Install Docker to run mysql
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-centos-7
```
sudo yum check-update
curl -fsSL https://get.docker.com/ | sh
sudo systemctl start docker
docker ps
```

## Start Mysql on Docker  
```
docker run -d \
  --name mysql_cloud \
  -e "MYSQL_ROOT_PASSWORD=root" \
  -v mysql_data:/var/lib/mysql \
  -p 3306:3306 \
  mysql:latest

```

## Install NodeJS and npm
```
[OPTIONAL]
sudo dnf module list nodejs

sudo dnf module enable nodejs:16
sudo dnf install nodejs
npm install -g yarn
node --version
npm --version
```

## Install unzip and copy zip
```
sudo yum install unzip

scp webapp.zip root@${IP}:/root
```
