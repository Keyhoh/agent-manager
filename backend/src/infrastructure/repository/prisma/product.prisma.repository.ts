import { Injectable } from '@nestjs/common';
import { Project, ProjectStatus } from '../../../domain/model/project.entity';
import { ProjectRepository } from '../../../domain/repository/project.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return projects.map((p) =>
      Project.reconstruct({
        id: p.id,
        name: p.name,
        description: p.description,
        repositoryUrl: p.repositoryUrl,
        status: p.status as ProjectStatus,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }),
    );
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return null;
    }

    return Project.reconstruct({
      id: project.id,
      name: project.name,
      description: project.description,
      repositoryUrl: project.repositoryUrl,
      status: project.status as ProjectStatus,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    });
  }

  async save(project: Project): Promise<Project> {
    const created = await this.prisma.project.create({
      data: {
        id: project.id,
        name: project.name,
        description: project.description,
        repositoryUrl: project.repositoryUrl,
        status: project.status,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
    });

    return Project.reconstruct({
      id: created.id,
      name: created.name,
      description: created.description,
      repositoryUrl: created.repositoryUrl,
      status: created.status as ProjectStatus,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async update(project: Project): Promise<Project> {
    const updated = await this.prisma.project.update({
      where: { id: project.id },
      data: {
        name: project.name,
        description: project.description,
        status: project.status,
        updatedAt: project.updatedAt,
      },
    });

    return Project.reconstruct({
      id: updated.id,
      name: updated.name,
      description: updated.description,
      repositoryUrl: updated.repositoryUrl,
      status: updated.status as ProjectStatus,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }
}
