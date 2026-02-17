import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsNotEmpty()
  repositoryUrl: string;
}
