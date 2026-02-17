import { TaskPriority, TaskStatus } from '../../../domain/model/task.entity';

export class TaskResponse {
  id: string;
  projectId: string;
  sprintId: string | null;
  parentTaskId: string | null;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  assignedAgentId: string | null;
  storyPoint: number | null;
  artifactPath: string | null;
  createdAt: Date;
  updatedAt: Date;
}
