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
import { ProjectStatus } from '../../../domain/model/project.entity';
import { ProjectService } from '../../../application/service/project.service';
import { CreateProjectRequest } from './create-project.request';
import { ProjectResponse } from './project.response';
import { UpdateProjectRequest } from './update-project.request';
import { Project } from '../../../domain/model/project.entity';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(): Promise<ProjectResponse[]> {
    const projects = await this.projectService.findAll();
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
    const project = await this.projectService.findById(id);
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
    const project = Project.create({
      name: dto.name,
      description: dto.description ?? null,
      repositoryUrl: dto.repositoryUrl,
      status: 'ACTIVE' as ProjectStatus,
    });

    const saved = await this.projectService.save(project);
    return {
      id: saved.id,
      name: saved.name,
      description: saved.description,
      repositoryUrl: saved.repositoryUrl,
      status: saved.status,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectRequest,
  ): Promise<ProjectResponse> {
    let project = await this.projectService.findById(id);

    if (dto.name !== undefined) {
      project = project.updateName(dto.name);
    }

    if (dto.description !== undefined) {
      project = project.updateDescription(dto.description);
    }

    if (dto.status !== undefined) {
      if (dto.status === ProjectStatus.ARCHIVED) {
        project = project.archive();
      } else if (dto.status === ProjectStatus.ACTIVE) {
        project = project.activate();
      }
    }

    const updated = await this.projectService.update(project);
    return {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      repositoryUrl: updated.repositoryUrl,
      status: updated.status,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.projectService.findById(id); // 存在確認
    await this.projectService.delete(id);
  }
}
