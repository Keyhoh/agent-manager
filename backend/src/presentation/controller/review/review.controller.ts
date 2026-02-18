import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ReviewService } from '@/application/service/review.service';
import { Review } from '@/domain/model/review.entity';
import { CreateReviewRequest } from './create-review.request';
import { UpdateReviewRequest } from './update-review.request';
import { ReviewResponse } from './review.response';

@Controller('api/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async findAll(
    @Query('sprintId') sprintId?: string,
  ): Promise<ReviewResponse[]> {
    const reviews = sprintId
      ? await this.reviewService.findBySprintId(sprintId)
      : await this.reviewService.findAll();

    return reviews.map((r) => ({
      id: r.id,
      sprintId: r.sprintId,
      reviewerId: r.reviewerId,
      rating: r.rating,
      comment: r.comment,
      approved: r.approved,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReviewResponse> {
    const review = await this.reviewService.findById(id);
    return {
      id: review.id,
      sprintId: review.sprintId,
      reviewerId: review.reviewerId,
      rating: review.rating,
      comment: review.comment,
      approved: review.approved,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }

  @Post()
  async create(@Body() dto: CreateReviewRequest): Promise<ReviewResponse> {
    const review = Review.create({
      sprintId: dto.sprintId,
      reviewerId: dto.reviewerId,
      rating: dto.rating,
      comment: dto.comment ?? null,
      approved: dto.approved,
    });

    const saved = await this.reviewService.save(review);
    return {
      id: saved.id,
      sprintId: saved.sprintId,
      reviewerId: saved.reviewerId,
      rating: saved.rating,
      comment: saved.comment,
      approved: saved.approved,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateReviewRequest,
  ): Promise<ReviewResponse> {
    let review = await this.reviewService.findById(id);

    if (dto.rating !== undefined) {
      review = review.updateRating(dto.rating);
    }

    if (dto.comment !== undefined) {
      review = review.updateComment(dto.comment);
    }

    if (dto.approved !== undefined) {
      review = dto.approved ? review.approve() : review.reject();
    }

    const updated = await this.reviewService.update(review);
    return {
      id: updated.id,
      sprintId: updated.sprintId,
      reviewerId: updated.reviewerId,
      rating: updated.rating,
      comment: updated.comment,
      approved: updated.approved,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.reviewService.delete(id);
  }
}
