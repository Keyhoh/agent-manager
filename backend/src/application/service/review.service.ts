import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { ReviewRepository } from '@/domain/repository/review.repository';
import { Review } from '@/domain/model/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('ReviewRepository')
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.findAll();
  }

  async findById(id: string): Promise<Review> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return review;
  }

  async findBySprintId(sprintId: string): Promise<Review[]> {
    return this.reviewRepository.findBySprintId(sprintId);
  }

  async save(review: Review): Promise<Review> {
    return this.reviewRepository.save(review);
  }

  async update(review: Review): Promise<Review> {
    return this.reviewRepository.update(review);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    return this.reviewRepository.delete(id);
  }
}
