# sudo chown -R csye6225:csye6225 /opt/csye6225/webapp
# sudo chmod -R 750 /opt/csye6225/webapp

sudo cp /tmp/bootup.service /lib/systemd/system/bootup.service
sudo systemctl daemon-reload
echo systemctl daemon-reload
sudo systemctl enable bootup
echo systemctl enable bootup
sudo systemctl start bootup
echo systemctl start bootup
sudo systemctl status bootup