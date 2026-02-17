import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '../../domain/model/project.entity';
import {
  type ProjectRepository,
  PROJECT_REPOSITORY,
} from '../../domain/repository/project.repository';

/**
 * ProjectService: 機能的凝集
 * 単一のRepositoryに対する操作を提供
 */
@Injectable()
export class ProjectService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async save(project: Project): Promise<Project> {
    return this.projectRepository.save(project);
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async update(project: Project): Promise<Project> {
    return this.projectRepository.update(project);
  }

  async delete(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
