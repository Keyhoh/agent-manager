import { Injectable } from '@nestjs/common';
import { Task, TaskStatus, TaskPriority } from '../../../domain/model/task.entity';
import { TaskRepository } from '../../../domain/repository/task.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return tasks.map((t) =>
      Task.reconstruct({
        id: t.id,
        projectId: t.projectId,
        sprintId: t.sprintId,
        parentTaskId: t.parentTaskId,
        title: t.title,
        description: t.description,
        priority: t.priority as TaskPriority,
        status: t.status as TaskStatus,
        assignedAgentId: t.assignedAgentId,
        storyPoint: t.storyPoint,
        artifactPath: t.artifactPath,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      }),
    );
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return null;
    }

    return Task.reconstruct({
      id: task.id,
      projectId: task.projectId,
      sprintId: task.sprintId,
      parentTaskId: task.parentTaskId,
      title: task.title,
      description: task.description,
      priority: task.priority as TaskPriority,
      status: task.status as TaskStatus,
      assignedAgentId: task.assignedAgentId,
      storyPoint: task.storyPoint,
      artifactPath: task.artifactPath,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  }

  async findByProjectId(projectId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });

    return tasks.map((t) =>
      Task.reconstruct({
        id: t.id,
        projectId: t.projectId,
        sprintId: t.sprintId,
        parentTaskId: t.parentTaskId,
        title: t.title,
        description: t.description,
        priority: t.priority as TaskPriority,
        status: t.status as TaskStatus,
        assignedAgentId: t.assignedAgentId,
        storyPoint: t.storyPoint,
        artifactPath: t.artifactPath,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      }),
    );
  }

  async findBySprintId(sprintId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { sprintId },
      orderBy: { createdAt: 'desc' },
    });

    return tasks.map((t) =>
      Task.reconstruct({
        id: t.id,
        projectId: t.projectId,
        sprintId: t.sprintId,
        parentTaskId: t.parentTaskId,
        title: t.title,
        description: t.description,
        priority: t.priority as TaskPriority,
        status: t.status as TaskStatus,
        assignedAgentId: t.assignedAgentId,
        storyPoint: t.storyPoint,
        artifactPath: t.artifactPath,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      }),
    );
  }

  async findByParentTaskId(parentTaskId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { parentTaskId },
      orderBy: { createdAt: 'desc' },
    });

    return tasks.map((t) =>
      Task.reconstruct({
        id: t.id,
        projectId: t.projectId,
        sprintId: t.sprintId,
        parentTaskId: t.parentTaskId,
        title: t.title,
        description: t.description,
        priority: t.priority as TaskPriority,
        status: t.status as TaskStatus,
        assignedAgentId: t.assignedAgentId,
        storyPoint: t.storyPoint,
        artifactPath: t.artifactPath,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      }),
    );
  }

  async save(task: Task): Promise<Task> {
    const created = await this.prisma.task.create({
      data: {
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
      },
    });

    return Task.reconstruct({
      id: created.id,
      projectId: created.projectId,
      sprintId: created.sprintId,
      parentTaskId: created.parentTaskId,
      title: created.title,
      description: created.description,
      priority: created.priority as TaskPriority,
      status: created.status as TaskStatus,
      assignedAgentId: created.assignedAgentId,
      storyPoint: created.storyPoint,
      artifactPath: created.artifactPath,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async update(task: Task): Promise<Task> {
    const updated = await this.prisma.task.update({
      where: { id: task.id },
      data: {
        sprintId: task.sprintId,
        parentTaskId: task.parentTaskId,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        assignedAgentId: task.assignedAgentId,
        storyPoint: task.storyPoint,
        artifactPath: task.artifactPath,
        updatedAt: task.updatedAt,
      },
    });

    return Task.reconstruct({
      id: updated.id,
      projectId: updated.projectId,
      sprintId: updated.sprintId,
      parentTaskId: updated.parentTaskId,
      title: updated.title,
      description: updated.description,
      priority: updated.priority as TaskPriority,
      status: updated.status as TaskStatus,
      assignedAgentId: updated.assignedAgentId,
      storyPoint: updated.storyPoint,
      artifactPath: updated.artifactPath,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
