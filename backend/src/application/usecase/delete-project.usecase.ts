import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type ProjectRepository,
  PROJECT_REPOSITORY,
} from '../../domain/repository/project.repository';

@Injectable()
export class DeleteProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await this.projectRepository.delete(id);
  }
}
