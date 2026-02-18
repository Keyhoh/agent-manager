import { SprintStatus } from '@/domain/model/sprint.entity';

export class SprintResponse {
  id: string;
  productId: string;
  name: string;
  goal: string | null;
  status: SprintStatus;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
