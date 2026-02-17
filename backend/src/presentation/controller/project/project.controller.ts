import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProjectUseCase } from '../../../application/usecase/create-project.usecase';
import { DeleteProjectUseCase } from '../../../application/usecase/delete-project.usecase';
import { GetAllProjectsUseCase } from '../../../application/usecase/get-all-projects.usecase';
import { GetProjectByIdUseCase } from '../../../application/usecase/get-project-by-id.usecase';
import { UpdateProjectUseCase } from '../../../application/usecase/update-project.usecase';
import { CreateProjectRequest } from './create-project.request';
import { ProjectResponse } from './project.response';
import { UpdateProjectRequest } from './update-project.request';

@Controller('api/projects')
export class ProjectController {
  constructor(
    private readonly getAllProjectsUseCase: GetAllProjectsUseCase,
    private readonly getProjectByIdUseCase: GetProjectByIdUseCase,
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
  ) {}

  @Get()
  async findAll(): Promise<ProjectResponse[]> {
    const projects = await this.getAllProjectsUseCase.execute();
    return projects.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      repositoryUrl: p.repositoryUrl,
      status: p.status,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectResponse> {
    const project = await this.getProjectByIdUseCase.execute(id);
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      repositoryUrl: project.repositoryUrl,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProjectRequest): Promise<ProjectResponse> {
    const project = await this.createProjectUseCase.execute({
      name: dto.name,
      description: dto.description ?? null,
      repositoryUrl: dto.repositoryUrl,
    });
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      repositoryUrl: project.repositoryUrl,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectRequest,
  ): Promise<ProjectResponse> {
    const project = await this.updateProjectUseCase.execute({
      id,
      name: dto.name,
      description: dto.description,
      status: dto.status,
    });
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      repositoryUrl: project.repositoryUrl,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteProjectUseCase.execute(id);
  }
}
