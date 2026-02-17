import { Task } from '../model/task.entity';

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  findByProjectId(projectId: string): Promise<Task[]>;
  findBySprintId(sprintId: string): Promise<Task[]>;
  findByParentTaskId(parentTaskId: string): Promise<Task[]>;
  save(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');
