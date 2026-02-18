import {
  IsNotEmpty,
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

export class CreateBacklogItemRequest {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsUUID()
  @IsOptional()
  sprintId?: string;

  @IsUUID()
  @IsOptional()
  parentBacklogItemId?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(BacklogItemPriority)
  @IsNotEmpty()
  priority: BacklogItemPriority;

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
