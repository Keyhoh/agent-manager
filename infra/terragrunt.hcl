remote_state {
  backend = "s3"
  config = {
    bucket         = "agent-manager-tfstate-${local.aws_account_id}"
    key            = "${path.relative_to_include()}/terraform.tfstate"
    region         = "ap-northeast-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
}

locals {
  aws_account_id = get_aws_account_id()
  aws_region     = "ap-northeast-1"
  environment    = get_env("ENVIRONMENT", "dev")
  project_name   = "agent-manager"
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<-EOF
    terraform {
      required_version = ">= 1.14.5"
      required_providers {
        aws = {
          source  = "hashicorp/aws"
          version = "~> 5.77"
        }
      }
    }

    provider "aws" {
      region = var.aws_region

      default_tags {
        tags = {
          Project     = var.project_name
          Environment = var.environment
          ManagedBy   = "Terraform"
        }
      }
    }
  EOF
}

generate "variables" {
  path      = "variables.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<-EOF
    variable "aws_region" {
      default = "${local.aws_region}"
    }
    variable "project_name" {
      default = "${local.project_name}"
    }
    variable "environment" {
      default = "${local.environment}"
    }
  EOF
}
