# IaC Infrastructure Configuration

This directory contains all Infrastructure as Code (IaC) configuration using Terragrunt and Terraform.

## Structure

```
infra/
├── terragrunt.hcl          # Root configuration
├── env/
│   └── dev/
│       └── rds/            # RDS (PostgreSQL) configuration
└── modules/
    └── rds/                # RDS module
```

## Prerequisites

- Terraform >= 1.0
- Terragrunt >= 0.55.0
- AWS CLI configured with appropriate credentials
- AWS account with permissions to manage RDS, EC2, S3, DynamoDB

## Setup

### 1. Create S3 bucket for Terraform state

```bash
aws s3api create-bucket \
  --bucket agent-manager-tfstate-$(aws sts get-caller-identity --query Account --output text) \
  --region ap-northeast-1 \
  --create-bucket-configuration LocationConstraint=ap-northeast-1

aws s3api put-bucket-versioning \
  --bucket agent-manager-tfstate-$(aws sts get-caller-identity --query Account --output text) \
  --versioning-configuration Status=Enabled

aws s3api put-bucket-encryption \
  --bucket agent-manager-tfstate-$(aws sts get-caller-identity --query Account --output text) \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'
```

### 2. Create DynamoDB table for state locking

```bash
aws dynamodb create-table \
  --table-name terraform-locks \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ap-northeast-1
```

## Usage

### Development environment

```bash
# Plan changes
cd env/dev
terragrunt plan

# Apply changes
terragrunt apply

# Destroy infrastructure
terragrunt destroy
```

### Environment variables

```bash
export ENVIRONMENT=dev
export AWS_REGION=ap-northeast-1
export AWS_PROFILE=your-profile-name
```

## Notes

- Backend state is managed in S3 with encryption and versioning
- State file locking uses DynamoDB to prevent concurrent modifications
- All resources are tagged with Project, Environment, and ManagedBy labels
