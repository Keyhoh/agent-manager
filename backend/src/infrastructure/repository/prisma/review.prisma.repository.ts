import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/repository/prisma/prisma.service';
import type { ReviewRepository } from '@/domain/repository/review.repository';
import { Review } from '@/domain/model/review.entity';

@Injectable()
export class PrismaReviewRepository implements ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return reviews.map((r) =>
      Review.reconstruct({
        id: r.id,
        sprintId: r.sprintId,
        reviewerId: r.reviewerId,
        rating: r.rating,
        comment: r.comment,
        approved: r.approved,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      }),
    );
  }

  async findById(id: string): Promise<Review | null> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return null;
    }

    return Review.reconstruct({
      id: review.id,
      sprintId: review.sprintId,
      reviewerId: review.reviewerId,
      rating: review.rating,
      comment: review.comment,
      approved: review.approved,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    });
  }

  async findBySprintId(sprintId: string): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      where: { sprintId },
      orderBy: { createdAt: 'desc' },
    });

    return reviews.map((r) =>
      Review.reconstruct({
        id: r.id,
        sprintId: r.sprintId,
        reviewerId: r.reviewerId,
        rating: r.rating,
        comment: r.comment,
        approved: r.approved,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      }),
    );
  }

  async save(review: Review): Promise<Review> {
    const created = await this.prisma.review.create({
      data: {
        id: review.id,
        sprintId: review.sprintId,
        reviewerId: review.reviewerId,
        rating: review.rating,
        comment: review.comment,
        approved: review.approved,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      },
    });

    return Review.reconstruct({
      id: created.id,
      sprintId: created.sprintId,
      reviewerId: created.reviewerId,
      rating: created.rating,
      comment: created.comment,
      approved: created.approved,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async update(review: Review): Promise<Review> {
    const updated = await this.prisma.review.update({
      where: { id: review.id },
      data: {
        rating: review.rating,
        comment: review.comment,
        approved: review.approved,
        updatedAt: review.updatedAt,
      },
    });

    return Review.reconstruct({
      id: updated.id,
      sprintId: updated.sprintId,
      reviewerId: updated.reviewerId,
      rating: updated.rating,
      comment: updated.comment,
      approved: updated.approved,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.review.delete({
      where: { id },
    });
  }
}
