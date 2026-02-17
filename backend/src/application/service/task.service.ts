import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '../../domain/model/task.entity';
import {
  type TaskRepository,
  TASK_REPOSITORY,
} from '../../domain/repository/task.repository';

/**
 * TaskService: 機能的凝集
 * 単一のRepositoryに対する操作を提供
 */
@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  async save(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async findByProjectId(projectId: string): Promise<Task[]> {
    return this.taskRepository.findByProjectId(projectId);
  }

  async findBySprintId(sprintId: string): Promise<Task[]> {
    return this.taskRepository.findBySprintId(sprintId);
  }

  async findByParentTaskId(parentTaskId: string): Promise<Task[]> {
    return this.taskRepository.findByParentTaskId(parentTaskId);
  }

  async update(task: Task): Promise<Task> {
    return this.taskRepository.update(task);
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
