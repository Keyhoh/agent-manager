import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { CreateProjectUseCase } from './create-project.usecase';
import { DeleteProjectUseCase } from './delete-project.usecase';
import { GetAllProjectsUseCase } from './get-all-projects.usecase';
import { GetProjectByIdUseCase } from './get-project-by-id.usecase';
import { UpdateProjectUseCase } from './update-project.usecase';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateProjectUseCase,
    DeleteProjectUseCase,
    GetAllProjectsUseCase,
    GetProjectByIdUseCase,
    UpdateProjectUseCase,
  ],
  exports: [
    CreateProjectUseCase,
    DeleteProjectUseCase,
    GetAllProjectsUseCase,
    GetProjectByIdUseCase,
    UpdateProjectUseCase,
  ],
})
export class UsecaseModule {}
