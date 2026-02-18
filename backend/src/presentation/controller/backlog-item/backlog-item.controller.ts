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
import { BacklogItemStatus } from '@/domain/model/backlog-item.entity';
import { BacklogItemService } from '@/application/service/backlog-item.service';
import { CreateBacklogItemRequest } from './create-backlog-item.request';
import { BacklogItemResponse } from './backlog-item.response';
import { UpdateBacklogItemRequest } from './update-backlog-item.request';
import { BacklogItem } from '@/domain/model/backlog-item.entity';

@Controller('api/backlog-items')
export class BacklogItemController {
  constructor(private readonly backlogItemService: BacklogItemService) {}

  @Get()
  async findAll(
    @Query('productId') productId?: string,
    @Query('sprintId') sprintId?: string,
    @Query('parentBacklogItemId') parentBacklogItemId?: string,
  ): Promise<BacklogItemResponse[]> {
    let backlogItems: BacklogItem[];

    if (productId) {
      backlogItems = await this.backlogItemService.findByProductId(productId);
    } else if (sprintId) {
      backlogItems = await this.backlogItemService.findBySprintId(sprintId);
    } else if (parentBacklogItemId) {
      backlogItems =
        await this.backlogItemService.findByParentBacklogItemId(
          parentBacklogItemId,
        );
    } else {
      backlogItems = await this.backlogItemService.findAll();
    }

    return backlogItems.map((b) => ({
      id: b.id,
      productId: b.productId,
      sprintId: b.sprintId,
      parentBacklogItemId: b.parentBacklogItemId,
      title: b.title,
      description: b.description,
      priority: b.priority,
      status: b.status,
      assignedAgentId: b.assignedAgentId,
      storyPoint: b.storyPoint,
      artifactPath: b.artifactPath,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BacklogItemResponse> {
    const backlogItem = await this.backlogItemService.findById(id);
    return {
      id: backlogItem.id,
      productId: backlogItem.productId,
      sprintId: backlogItem.sprintId,
      parentBacklogItemId: backlogItem.parentBacklogItemId,
      title: backlogItem.title,
      description: backlogItem.description,
      priority: backlogItem.priority,
      status: backlogItem.status,
      assignedAgentId: backlogItem.assignedAgentId,
      storyPoint: backlogItem.storyPoint,
      artifactPath: backlogItem.artifactPath,
      createdAt: backlogItem.createdAt,
      updatedAt: backlogItem.updatedAt,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateBacklogItemRequest,
  ): Promise<BacklogItemResponse> {
    const backlogItem = BacklogItem.create({
      productId: dto.productId,
      sprintId: dto.sprintId ?? null,
      parentBacklogItemId: dto.parentBacklogItemId ?? null,
      title: dto.title,
      description: dto.description ?? null,
      priority: dto.priority,
      status: dto.status ?? BacklogItemStatus.BACKLOG,
      assignedAgentId: dto.assignedAgentId ?? null,
      storyPoint: dto.storyPoint ?? null,
      artifactPath: dto.artifactPath ?? null,
    });

    const saved = await this.backlogItemService.save(backlogItem);
    return {
      id: saved.id,
      productId: saved.productId,
      sprintId: saved.sprintId,
      parentBacklogItemId: saved.parentBacklogItemId,
      title: saved.title,
      description: saved.description,
      priority: saved.priority,
      status: saved.status,
      assignedAgentId: saved.assignedAgentId,
      storyPoint: saved.storyPoint,
      artifactPath: saved.artifactPath,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBacklogItemRequest,
  ): Promise<BacklogItemResponse> {
    let backlogItem = await this.backlogItemService.findById(id);

    if (dto.title !== undefined) {
      backlogItem = backlogItem.updateTitle(dto.title);
    }

    if (dto.description !== undefined) {
      backlogItem = backlogItem.updateDescription(dto.description);
    }

    if (dto.priority !== undefined) {
      backlogItem = backlogItem.updatePriority(dto.priority);
    }

    if (dto.status !== undefined) {
      backlogItem = backlogItem.updateStatus(dto.status);
    }

    if (dto.sprintId !== undefined) {
      if (dto.sprintId) {
        backlogItem = backlogItem.assignToSprint(dto.sprintId);
      } else {
        backlogItem = backlogItem.removeFromSprint();
      }
    }

    if (dto.assignedAgentId !== undefined) {
      if (dto.assignedAgentId) {
        backlogItem = backlogItem.assignAgent(dto.assignedAgentId);
      } else {
        backlogItem = backlogItem.unassignAgent();
      }
    }

    if (dto.storyPoint !== undefined) {
      backlogItem = backlogItem.updateStoryPoint(dto.storyPoint);
    }

    if (dto.artifactPath !== undefined) {
      backlogItem = backlogItem.updateArtifactPath(dto.artifactPath);
    }

    const updated = await this.backlogItemService.update(backlogItem);
    return {
      id: updated.id,
      productId: updated.productId,
      sprintId: updated.sprintId,
      parentBacklogItemId: updated.parentBacklogItemId,
      title: updated.title,
      description: updated.description,
      priority: updated.priority,
      status: updated.status,
      assignedAgentId: updated.assignedAgentId,
      storyPoint: updated.storyPoint,
      artifactPath: updated.artifactPath,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.backlogItemService.findById(id); // 存在確認
    await this.backlogItemService.delete(id);
  }
}
