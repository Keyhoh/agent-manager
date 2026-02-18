import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsUUID,
} from 'class-validator';
import {
  BacklogItemPriority,
  BacklogItemStatus,
} from '@/domain/model/backlog-item.entity';

export class UpdateBacklogItemRequest {
  @IsUUID()
  @IsOptional()
  sprintId?: string;

  @IsUUID()
  @IsOptional()
  parentBacklogItemId?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(BacklogItemPriority)
  @IsOptional()
  priority?: BacklogItemPriority;

  @IsEnum(BacklogItemStatus)
  @IsOptional()
  status?: BacklogItemStatus;

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
