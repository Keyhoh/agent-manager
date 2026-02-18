import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProductStatus } from '@/domain/model/product.entity';

export class UpdateProductRequest {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;
}
