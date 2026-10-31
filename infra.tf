terraform {
  required_version = ">= 1.6.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }
}

variable "cloudflare_api_token" {
  type      = string
  sensitive = true
}

variable "zone_id" {
  type        = string
  description = "Cloudflare zone ID for teregonlabs.com"
  default     = "803cbbc234e8e661421501e85d7d9a12"
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_dns_record" "site" {
  zone_id = var.zone_id
  name    = "@"
  type    = "CNAME"
  content = "6e405568a12fae88.vercel-dns-017.com"
  ttl     = 1
  proxied = false
}

resource "cloudflare_dns_record" "www" {
  zone_id = var.zone_id
  name    = "www"
  type    = "CNAME"
  content = "teregonlabs.com"
  ttl     = 1
  proxied = false
}
