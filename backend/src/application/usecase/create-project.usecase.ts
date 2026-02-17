import { Inject, Injectable } from '@nestjs/common';
import { Project, ProjectStatus } from '../../domain/model/project.entity';
import {
  type ProjectRepository,
  PROJECT_REPOSITORY,
} from '../../domain/repository/project.repository';

export interface CreateProjectCommand {
  name: string;
  description: string | null;
  repositoryUrl: string;
}

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(command: CreateProjectCommand): Promise<Project> {
    const project = Project.create({
      name: command.name,
      description: command.description,
      repositoryUrl: command.repositoryUrl,
      status: 'ACTIVE' as ProjectStatus,
    });

    return this.projectRepository.save(project);
  }
}
