resource "digitalocean_droplet" "instance" {
  count = 1
  image = "ubuntu-20-04-x64"
  name = "packet-pigeon-subscriber"
  region = "fra1"
  size = "s-1vcpu-1gb"
  private_networking = true
  tags = ["subscriber_v1_0"]
  ssh_keys = [29902027]
  connection {
    host = self.ipv4_address
    user = "root"
    type = "ssh"
    private_key = var.pvt_key
    timeout = "2m"
  }
  provisioner "remote-exec" {
    inline = [
      "echo Hello!"
    ]
  }
  provisioner "remote-exec" {
    inline = [
      "sudo fallocate -l 1G /swapfile",
      "sudo chmod 600 /swapfile",
      "sudo mkswap /swapfile",
      "sudo swapon /swapfile"
    ]
  }
  provisioner "local-exec" {
    command = "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -u root -i '${self.ipv4_address},' --private-key ${var.pvt_key_file} ../playbooks/server-setup.yml -e \"aws_access_key=${var.aws_access_key}\" -e \"aws_secret_key=${var.aws_secret_key}\" -e \"do_instance_ip=${self.ipv4_address}\""
  }

}

resource "aws_s3_bucket" "state_bucket" {
  bucket = "packet-pigeon-subscriber-terraform-state"
  acl    = "private"

  # Tells AWS to encrypt the S3 bucket at rest by default
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  # Prevents Terraform from destroying or replacing this object - a great safety mechanism
  lifecycle {
    prevent_destroy = true
  }

  # Tells AWS to keep a version history of the state file
  versioning {
    enabled = true
  }

  tags = {
    Terraform = "true"
  }
}

resource "aws_s3_bucket_public_access_block" "app" {
  bucket = aws_s3_bucket.state_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
