import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { TaskPriority, TaskStatus } from '../../../domain/model/task.entity';

export class UpdateTaskRequest {
  @IsUUID()
  @IsOptional()
  sprintId?: string;

  @IsUUID()
  @IsOptional()
  parentTaskId?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsString()
  @IsOptional()
  assignedAgentId?: string;

  @IsNumber()
  @IsOptional()
  storyPoint?: number;

  @IsString()
  @IsOptional()
  artifactPath?: string;
}
