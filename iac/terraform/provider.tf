terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "2.7.0"
    }
#    cloudflare = {
#      source = "cloudflare/cloudflare"
#      version = "~> 2.0"
#    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
  backend "s3" {
    bucket = "packet-pigeon-subscriber-terraform-state"
    key = "default-infrastructure"
    region = "eu-west-1"
    profile = "default"
    encrypt = true
  }
}
# Digital Ocean
data "digitalocean_ssh_key" "enigma-ssh" {
  name = "enigma-ssh"
}
variable "do_token" {}
provider "digitalocean" {
  token = var.do_token
}

# AWS
variable "aws_region" {}
variable "aws_access_key" {}
variable "aws_secret_key" {}
provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

# SSH access prerequisites
variable "pvt_key" {}
variable "pvt_key_file" {}

##Cloudflare
#variable "cloudflare_token" {}
#variable "cloudflare_zone_id" {}
#variable "cloudflare_email" {}
#provider "cloudflare" {
#  email = var.cloudflare_email
#  api_key = var.cloudflare_token
#}

## Misc.
variable "uuid" {}
