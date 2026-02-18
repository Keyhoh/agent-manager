import { v7 as uuidv7 } from 'uuid';

export interface ReviewProps {
  id: string;
  sprintId: string;
  reviewerId: string;
  rating: number;
  comment: string | null;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Review {
  private constructor(private readonly props: ReviewProps) {
    if (props.rating < 1 || props.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
  }

  static create(
    props: Omit<ReviewProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): Review {
    const now = new Date();
    return new Review({
      ...props,
      id: uuidv7(),
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstruct(props: ReviewProps): Review {
    return new Review(props);
  }

  get id(): string {
    return this.props.id;
  }

  get sprintId(): string {
    return this.props.sprintId;
  }

  get reviewerId(): string {
    return this.props.reviewerId;
  }

  get rating(): number {
    return this.props.rating;
  }

  get comment(): string | null {
    return this.props.comment;
  }

  get approved(): boolean {
    return this.props.approved;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateRating(rating: number): Review {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    return new Review({
      ...this.props,
      rating,
      updatedAt: new Date(),
    });
  }

  updateComment(comment: string | null): Review {
    return new Review({
      ...this.props,
      comment,
      updatedAt: new Date(),
    });
  }

  approve(): Review {
    return new Review({
      ...this.props,
      approved: true,
      updatedAt: new Date(),
    });
  }

  reject(): Review {
    return new Review({
      ...this.props,
      approved: false,
      updatedAt: new Date(),
    });
  }
}
