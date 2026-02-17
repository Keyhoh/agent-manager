import { Inject, Injectable } from '@nestjs/common';
import { Project } from '../../domain/model/project.entity';
import {
  type ProjectRepository,
  PROJECT_REPOSITORY,
} from '../../domain/repository/project.repository';

@Injectable()
export class GetAllProjectsUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }
}
