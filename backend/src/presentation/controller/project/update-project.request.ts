import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProjectStatus } from '../../../domain/model/project.entity';

export class UpdateProjectRequest {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}
