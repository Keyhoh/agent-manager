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
  Query,
} from '@nestjs/common';
import { SprintStatus } from '../../../domain/model/sprint.entity';
import { SprintService } from '../../../application/service/sprint.service';
import { CreateSprintRequest } from './create-sprint.request';
import { SprintResponse } from './sprint.response';
import { UpdateSprintRequest } from './update-sprint.request';
import { Sprint } from '../../../domain/model/sprint.entity';

@Controller('api/sprints')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @Get()
  async findAll(
    @Query('projectId') projectId?: string,
  ): Promise<SprintResponse[]> {
    const sprints = projectId
      ? await this.sprintService.findByProjectId(projectId)
      : await this.sprintService.findAll();

    return sprints.map((s) => ({
      id: s.id,
      projectId: s.projectId,
      name: s.name,
      goal: s.goal,
      status: s.status,
      startDate: s.startDate,
      endDate: s.endDate,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SprintResponse> {
    const sprint = await this.sprintService.findById(id);
    return {
      id: sprint.id,
      projectId: sprint.projectId,
      name: sprint.name,
      goal: sprint.goal,
      status: sprint.status,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      createdAt: sprint.createdAt,
      updatedAt: sprint.updatedAt,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateSprintRequest): Promise<SprintResponse> {
    const sprint = Sprint.create({
      projectId: dto.projectId,
      name: dto.name,
      goal: dto.goal ?? null,
      status: dto.status ?? SprintStatus.PLANNED,
      startDate: dto.startDate ? new Date(dto.startDate) : null,
      endDate: dto.endDate ? new Date(dto.endDate) : null,
    });

    const saved = await this.sprintService.save(sprint);
    return {
      id: saved.id,
      projectId: saved.projectId,
      name: saved.name,
      goal: saved.goal,
      status: saved.status,
      startDate: saved.startDate,
      endDate: saved.endDate,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSprintRequest,
  ): Promise<SprintResponse> {
    let sprint = await this.sprintService.findById(id);

    if (dto.name !== undefined) {
      sprint = sprint.updateName(dto.name);
    }

    if (dto.goal !== undefined) {
      sprint = sprint.updateGoal(dto.goal);
    }

    if (dto.status !== undefined) {
      if (dto.status === SprintStatus.ACTIVE) {
        const startDate = dto.startDate
          ? new Date(dto.startDate)
          : sprint.startDate ?? new Date();
        const endDate = dto.endDate
          ? new Date(dto.endDate)
          : sprint.endDate ?? new Date();
        sprint = sprint.start(startDate, endDate);
      } else if (dto.status === SprintStatus.COMPLETED) {
        sprint = sprint.complete();
      } else if (dto.status === SprintStatus.PLANNED) {
        sprint = sprint.reopen();
      }
    } else if (dto.startDate !== undefined || dto.endDate !== undefined) {
      const startDate = dto.startDate
        ? new Date(dto.startDate)
        : sprint.startDate;
      const endDate = dto.endDate ? new Date(dto.endDate) : sprint.endDate;
      sprint = sprint.updateDates(startDate, endDate);
    }

    const updated = await this.sprintService.update(sprint);
    return {
      id: updated.id,
      projectId: updated.projectId,
      name: updated.name,
      goal: updated.goal,
      status: updated.status,
      startDate: updated.startDate,
      endDate: updated.endDate,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.sprintService.findById(id); // 存在確認
    await this.sprintService.delete(id);
  }
}
