include "root" {
  path = find_in_parent_folders()
}

terraform {
  source = "../modules//rds"
}

inputs = {
  identifier              = "agent-manager-db"
  engine                  = "postgres"
  engine_version          = "16.5"
  family                  = "postgres16"
  major_engine_version    = "16"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  max_allocated_storage   = 100
  storage_encrypted       = true
  database_name           = "agent_manager"
  username                = "agentmanager"
  manage_master_user_password = true
  backup_retention_period = 7
  deletion_protection     = false
  skip_final_snapshot     = false
  final_snapshot_identifier = "agent-manager-db-final-snapshot-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  backup_window           = "03:00-04:00"
  maintenance_window      = "mon:04:00-mon:05:00"
  publicly_accessible     = false
  multi_az                = false

  tags = {
    Name = "agent-manager-db"
  }
}
