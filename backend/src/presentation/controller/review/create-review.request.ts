import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateReviewRequest {
  @IsUUID()
  @IsNotEmpty()
  sprintId: string;

  @IsString()
  @IsNotEmpty()
  reviewerId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsBoolean()
  approved: boolean;
}
