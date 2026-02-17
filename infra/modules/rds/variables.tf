variable "identifier" {
  type        = string
  description = "The name of the RDS cluster"
}

variable "engine" {
  type        = string
  default     = "aurora-postgresql"
  description = "The database engine"
}

variable "engine_version" {
  type        = string
  default     = "15.3"
  description = "The database engine version"
}

variable "family" {
  type        = string
  default     = "postgres15"
  description = "The database family for parameter group"
}

variable "major_engine_version" {
  type        = string
  default     = "15"
  description = "The major engine version"
}

variable "instance_class" {
  type        = string
  default     = "db.t3.micro"
  description = "The instance class"
}

variable "allocated_storage" {
  type        = number
  default     = 20
  description = "Allocated storage in GB"
}

variable "max_allocated_storage" {
  type        = number
  default     = 100
  description = "Maximum allocated storage for autoscaling"
}

variable "storage_encrypted" {
  type        = bool
  default     = true
  description = "Enable storage encryption"
}

variable "database_name" {
  type        = string
  description = "The database name"
}

variable "username" {
  type        = string
  description = "The database master username"
}

variable "port" {
  type        = number
  default     = 5432
  description = "The database port"
}

variable "manage_master_user_password" {
  type        = bool
  default     = true
  description = "Let RDS manage the master user password in Secrets Manager"
}

variable "backup_retention_period" {
  type        = number
  default     = 7
  description = "The backup retention period in days"
}

variable "deletion_protection" {
  type        = bool
  default     = false
  description = "Enable deletion protection"
}

variable "skip_final_snapshot" {
  type        = bool
  default     = false
  description = "Skip final snapshot when deleting"
}

variable "final_snapshot_identifier" {
  type        = string
  default     = ""
  description = "The final snapshot identifier"
}

variable "backup_window" {
  type        = string
  default     = "03:00-04:00"
  description = "The backup window"
}

variable "maintenance_window" {
  type        = string
  default     = "mon:04:00-mon:05:00"
  description = "The maintenance window"
}

variable "publicly_accessible" {
  type        = bool
  default     = false
  description = "Make the database publicly accessible"
}

variable "multi_az" {
  type        = bool
  default     = false
  description = "Enable multi-AZ"
}

variable "subnet_ids" {
  type        = list(string)
  default     = []
  description = "List of subnet IDs for the DB subnet group"
}

variable "allowed_cidr_blocks" {
  type        = list(string)
  default     = ["10.0.0.0/8"]
  description = "CIDR blocks allowed to access the database"
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Tags to apply to resources"
}
