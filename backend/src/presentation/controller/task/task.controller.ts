import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskStatus, TaskPriority } from '../../../domain/model/task.entity';
import { TaskService } from '../../../application/service/task.service';
import { CreateTaskRequest } from './create-task.request';
import { TaskResponse } from './task.response';
import { UpdateTaskRequest } from './update-task.request';
import { Task } from '../../../domain/model/task.entity';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(
    @Query('projectId') projectId?: string,
    @Query('sprintId') sprintId?: string,
    @Query('parentTaskId') parentTaskId?: string,
  ): Promise<TaskResponse[]> {
    let tasks: Task[];

    if (projectId) {
      tasks = await this.taskService.findByProjectId(projectId);
    } else if (sprintId) {
      tasks = await this.taskService.findBySprintId(sprintId);
    } else if (parentTaskId) {
      tasks = await this.taskService.findByParentTaskId(parentTaskId);
    } else {
      tasks = await this.taskService.findAll();
    }

    return tasks.map((t) => ({
      id: t.id,
      projectId: t.projectId,
      sprintId: t.sprintId,
      parentTaskId: t.parentTaskId,
      title: t.title,
      description: t.description,
      priority: t.priority,
      status: t.status,
      assignedAgentId: t.assignedAgentId,
      storyPoint: t.storyPoint,
      artifactPath: t.artifactPath,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskResponse> {
    const task = await this.taskService.findById(id);
    return {
      id: task.id,
      projectId: task.projectId,
      sprintId: task.sprintId,
      parentTaskId: task.parentTaskId,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      assignedAgentId: task.assignedAgentId,
      storyPoint: task.storyPoint,
      artifactPath: task.artifactPath,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTaskRequest): Promise<TaskResponse> {
    const task = Task.create({
      projectId: dto.projectId,
      sprintId: dto.sprintId ?? null,
      parentTaskId: dto.parentTaskId ?? null,
      title: dto.title,
      description: dto.description ?? null,
      priority: dto.priority,
      status: dto.status ?? TaskStatus.BACKLOG,
      assignedAgentId: dto.assignedAgentId ?? null,
      storyPoint: dto.storyPoint ?? null,
      artifactPath: dto.artifactPath ?? null,
    });

    const saved = await this.taskService.save(task);
    return {
      id: saved.id,
      projectId: saved.projectId,
      sprintId: saved.sprintId,
      parentTaskId: saved.parentTaskId,
      title: saved.title,
      description: saved.description,
      priority: saved.priority,
      status: saved.status,
      assignedAgentId: saved.assignedAgentId,
      storyPoint: saved.storyPoint,
      artifactPath: saved.artifactPath,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskRequest,
  ): Promise<TaskResponse> {
    let task = await this.taskService.findById(id);

    if (dto.title !== undefined) {
      task = task.updateTitle(dto.title);
    }

    if (dto.description !== undefined) {
      task = task.updateDescription(dto.description);
    }

    if (dto.priority !== undefined) {
      task = task.updatePriority(dto.priority);
    }

    if (dto.status !== undefined) {
      task = task.updateStatus(dto.status);
    }

    if (dto.sprintId !== undefined) {
      if (dto.sprintId) {
        task = task.assignToSprint(dto.sprintId);
      } else {
        task = task.removeFromSprint();
      }
    }

    if (dto.assignedAgentId !== undefined) {
      if (dto.assignedAgentId) {
        task = task.assignAgent(dto.assignedAgentId);
      } else {
        task = task.unassignAgent();
      }
    }

    if (dto.storyPoint !== undefined) {
      task = task.updateStoryPoint(dto.storyPoint);
    }

    if (dto.artifactPath !== undefined) {
      task = task.updateArtifactPath(dto.artifactPath);
    }

    const updated = await this.taskService.update(task);
    return {
      id: updated.id,
      projectId: updated.projectId,
      sprintId: updated.sprintId,
      parentTaskId: updated.parentTaskId,
      title: updated.title,
      description: updated.description,
      priority: updated.priority,
      status: updated.status,
      assignedAgentId: updated.assignedAgentId,
      storyPoint: updated.storyPoint,
      artifactPath: updated.artifactPath,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.taskService.findById(id); // 存在確認
    await this.taskService.delete(id);
  }
}
