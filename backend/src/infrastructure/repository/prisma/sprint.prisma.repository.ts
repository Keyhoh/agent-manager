import { Injectable } from '@nestjs/common';
import { Sprint, SprintStatus } from '../../../domain/model/sprint.entity';
import { SprintRepository } from '../../../domain/repository/sprint.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaSprintRepository implements SprintRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Sprint[]> {
    const sprints = await this.prisma.sprint.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return sprints.map((s) =>
      Sprint.reconstruct({
        id: s.id,
        projectId: s.projectId,
        name: s.name,
        goal: s.goal,
        status: s.status as SprintStatus,
        startDate: s.startDate,
        endDate: s.endDate,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      }),
    );
  }

  async findById(id: string): Promise<Sprint | null> {
    const sprint = await this.prisma.sprint.findUnique({
      where: { id },
    });

    if (!sprint) {
      return null;
    }

    return Sprint.reconstruct({
      id: sprint.id,
      projectId: sprint.projectId,
      name: sprint.name,
      goal: sprint.goal,
      status: sprint.status as SprintStatus,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      createdAt: sprint.createdAt,
      updatedAt: sprint.updatedAt,
    });
  }

  async findByProjectId(projectId: string): Promise<Sprint[]> {
    const sprints = await this.prisma.sprint.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });

    return sprints.map((s) =>
      Sprint.reconstruct({
        id: s.id,
        projectId: s.projectId,
        name: s.name,
        goal: s.goal,
        status: s.status as SprintStatus,
        startDate: s.startDate,
        endDate: s.endDate,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      }),
    );
  }

  async save(sprint: Sprint): Promise<Sprint> {
    const created = await this.prisma.sprint.create({
      data: {
        id: sprint.id,
        projectId: sprint.projectId,
        name: sprint.name,
        goal: sprint.goal,
        status: sprint.status,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        createdAt: sprint.createdAt,
        updatedAt: sprint.updatedAt,
      },
    });

    return Sprint.reconstruct({
      id: created.id,
      projectId: created.projectId,
      name: created.name,
      goal: created.goal,
      status: created.status as SprintStatus,
      startDate: created.startDate,
      endDate: created.endDate,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async update(sprint: Sprint): Promise<Sprint> {
    const updated = await this.prisma.sprint.update({
      where: { id: sprint.id },
      data: {
        name: sprint.name,
        goal: sprint.goal,
        status: sprint.status,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        updatedAt: sprint.updatedAt,
      },
    });

    return Sprint.reconstruct({
      id: updated.id,
      projectId: updated.projectId,
      name: updated.name,
      goal: updated.goal,
      status: updated.status as SprintStatus,
      startDate: updated.startDate,
      endDate: updated.endDate,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.sprint.delete({
      where: { id },
    });
  }
}
