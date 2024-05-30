packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1.1.3"
    }
  }
}

source "googlecompute" "centos-stream8" {
  project_id          = "project4-414017"
  source_image_family = "centos-stream-8"
  zone                = "us-east4-b"
  image_name          = "centos-stream8-{{timestamp}}"
  ssh_username        = "centos"
  image_family        = "centos-stream8"
  image_description   = "Custom CentOS stream 8 image"
  #subnetwork         = "projects/project4-414017/regions/us-east4/subnetworks/webapp1"
  #network= "global/networks/cloudassignmentvpc5"
  network = "global/networks/cloudassignmentvpc5"
  subnetwork = "regions/us-east4/subnetworks/subnet1"
  wait_to_add_ssh_keys = "20s"
}

build {
  sources = [
    "source.googlecompute.centos-stream8"
  ]

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "file" {
    source      = "./packer/setup.sh"
    destination = "/tmp/setup.sh"
  }

  provisioner "file" {
    source      = "./packer/init.sh"
    destination = "/tmp/init.sh"
  }

  provisioner "file" {
    source      = "./packer/bootup.service"
    destination = "/tmp/bootup.service"
  }
  
  provisioner "shell" {
    inline = [
      "/bin/bash -c 'cd /tmp && sudo chmod +x /tmp/setup.sh && /tmp/setup.sh && sudo chmod +x /tmp/init.sh && /tmp/init.sh && echo Scripts executed successfully!'"
    ]
    pause_before = "10s"
    timeout = "10s"
  }
}
