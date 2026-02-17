import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Project, ProjectStatus } from '../../domain/model/project.entity';
import {
  type ProjectRepository,
  PROJECT_REPOSITORY,
} from '../../domain/repository/project.repository';

export interface UpdateProjectCommand {
  id: string;
  name?: string;
  description?: string | null;
  status?: ProjectStatus;
}

@Injectable()
export class UpdateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(command: UpdateProjectCommand): Promise<Project> {
    let project = await this.projectRepository.findById(command.id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${command.id} not found`);
    }

    if (command.name !== undefined) {
      project = project.updateName(command.name);
    }

    if (command.description !== undefined) {
      project = project.updateDescription(command.description);
    }

    if (command.status !== undefined) {
      if (command.status === ProjectStatus.ARCHIVED) {
        project = project.archive();
      } else if (command.status === ProjectStatus.ACTIVE) {
        project = project.activate();
      }
    }

    return this.projectRepository.update(project);
  }
}
