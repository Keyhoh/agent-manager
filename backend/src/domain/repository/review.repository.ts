import { Review } from '../model/review.entity';

export interface ReviewRepository {
  findAll(): Promise<Review[]>;
  findById(id: string): Promise<Review | null>;
  findBySprintId(sprintId: string): Promise<Review[]>;
  save(review: Review): Promise<Review>;
  update(review: Review): Promise<Review>;
  delete(id: string): Promise<void>;
}
