export class ReviewResponse {
  id: string;
  sprintId: string;
  reviewerId: string;
  rating: number;
  comment: string | null;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
