#!/bin/bash

# Update system packages
sudo yum update -y

# Install Vim and net-tools
sudo yum install -y vim net-tools

# Install Node.js v20.x
curl -sL https://rpm.nodesource.com/setup_20.x | sudo bash -

sudo yum install -y nodejs

sudo yum install -y unzip

echo unzip done

# sudo yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm

# echo postgres download done

# sudo rpm --import https://www.postgresql.org/media/keys/ACCC4CF8.asc

# sudo yum clean all

# sudo yum --nogpgcheck install -y postgresql-server postgresql-contrib

# echo postgres install done

# sudo PGSETUP_INITDB_OPTIONS=" --auth=trust" postgresql-setup --initdb --unit postgresql –debug

# echo permission changed

# sudo systemctl start postgresql

# echo postgresql started

# sudo systemctl enable postgresql

# echo postgresql enabled

# sudo -u postgres bash -c 'psql -c "ALTER USER postgres WITH PASSWORD '\''root'\'';" && psql -c "CREATE DATABASE cloudassignmentdatabase;"'

# sudo yum install -y gcc-c++ make

# sudo yum install -y nodejs

# rm -rf node_modules

sudo mkdir -p /opt/csye6225/

# sudo groupadd csye6225

# sudo useradd -s /sbin/nologin -g csye6225 -d /opt/csye6225 -m csye6225

# sudo useradd -g csye6225 -d /opt/csye6225 -m csye6225

sudo cp /tmp/webapp.zip /opt/csye6225/

cd /opt/csye6225 || exit

sudo mkdir webapp

sudo unzip webapp.zip -d webapp

# go in the webapp
cd webapp/ || exit

#install the npm dependencies

sudo npm install

# sudo npm install dotenv

#we need to install postgres
# # Install MySQL server
# sudo yum install -y mysql-server

# # Start and enable MySQL service to run on boot
# sudo systemctl start mysqld
# sudo systemctl enable mysqld
