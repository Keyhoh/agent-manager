import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { SprintStatus } from '../../../domain/model/sprint.entity';

export class UpdateSprintRequest {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  goal?: string;

  @IsEnum(SprintStatus)
  @IsOptional()
  status?: SprintStatus;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}
