import {
  BacklogItemPriority,
  BacklogItemStatus,
} from '@/domain/model/backlog-item.entity';

export class BacklogItemResponse {
  id: string;
  productId: string;
  sprintId: string | null;
  parentBacklogItemId: string | null;
  title: string;
  description: string | null;
  priority: BacklogItemPriority;
  status: BacklogItemStatus;
  assignedAgentId: string | null;
  storyPoint: number | null;
  artifactPath: string | null;
  createdAt: Date;
  updatedAt: Date;
}
