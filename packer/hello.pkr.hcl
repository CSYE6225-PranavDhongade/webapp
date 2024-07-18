/*
packer {
  required_plugins {
    googlecompute = {
      version = "~> v1.0"
      source  = "github.com/hashicorp/googlecompute"
    }
  }
}

variable "zone" {
  type = string
  default = "us-east4-b"
}

source "googlecompute" "ex" {
  image_name              = "test-packer-example"
  machine_type            = "e2-highmem-16"
  source_image            = "debian-10-buster-v20210316"
  ssh_username            = "packer"
  temporary_key_pair_type = "rsa"
  temporary_key_pair_bits = 2048
  zone                    = var.zone
  project_id              = "project4-414017"
  network= "global/networks/cloudassignmentvpc5"
  subnetwork = "regions/us-east4/subnetworks/subnet1"
}

build {
  sources = ["source.googlecompute.ex"]
  provisioner "shell" {
    inline = [
      "echo Hello From ${source.type} ${source.name}"
    ]
  }
}
*/