import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '../../domain/model/project.entity';
import {
  type ProjectRepository,
  PROJECT_REPOSITORY,
} from '../../domain/repository/project.repository';

@Injectable()
export class GetProjectByIdUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }
}
