import { Injectable } from '@nestjs/common';
import {
  BacklogItem,
  BacklogItemStatus,
  BacklogItemPriority,
} from '@/domain/model/backlog-item.entity';
import { BacklogItemRepository } from '@/domain/repository/backlog-item.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaBacklogItemRepository implements BacklogItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<BacklogItem[]> {
    const backlogItems = await this.prisma.backlogItem.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return backlogItems.map((item) =>
      BacklogItem.reconstruct({
        id: item.id,
        productId: item.productId,
        sprintId: item.sprintId,
        parentBacklogItemId: item.parentBacklogItemId,
        title: item.title,
        description: item.description,
        priority: item.priority as BacklogItemPriority,
        status: item.status as BacklogItemStatus,
        assignedAgentId: item.assignedAgentId,
        storyPoint: item.storyPoint,
        artifactPath: item.artifactPath,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }),
    );
  }

  async findById(id: string): Promise<BacklogItem | null> {
    const item = await this.prisma.backlogItem.findUnique({
      where: { id },
    });

    if (!item) {
      return null;
    }

    return BacklogItem.reconstruct({
      id: item.id,
      productId: item.productId,
      sprintId: item.sprintId,
      parentBacklogItemId: item.parentBacklogItemId,
      title: item.title,
      description: item.description,
      priority: item.priority as BacklogItemPriority,
      status: item.status as BacklogItemStatus,
      assignedAgentId: item.assignedAgentId,
      storyPoint: item.storyPoint,
      artifactPath: item.artifactPath,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async findByProductId(productId: string): Promise<BacklogItem[]> {
    const backlogItems = await this.prisma.backlogItem.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });

    return backlogItems.map((item) =>
      BacklogItem.reconstruct({
        id: item.id,
        productId: item.productId,
        sprintId: item.sprintId,
        parentBacklogItemId: item.parentBacklogItemId,
        title: item.title,
        description: item.description,
        priority: item.priority as BacklogItemPriority,
        status: item.status as BacklogItemStatus,
        assignedAgentId: item.assignedAgentId,
        storyPoint: item.storyPoint,
        artifactPath: item.artifactPath,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }),
    );
  }

  async findBySprintId(sprintId: string): Promise<BacklogItem[]> {
    const backlogItems = await this.prisma.backlogItem.findMany({
      where: { sprintId },
      orderBy: { createdAt: 'desc' },
    });

    return backlogItems.map((item) =>
      BacklogItem.reconstruct({
        id: item.id,
        productId: item.productId,
        sprintId: item.sprintId,
        parentBacklogItemId: item.parentBacklogItemId,
        title: item.title,
        description: item.description,
        priority: item.priority as BacklogItemPriority,
        status: item.status as BacklogItemStatus,
        assignedAgentId: item.assignedAgentId,
        storyPoint: item.storyPoint,
        artifactPath: item.artifactPath,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }),
    );
  }

  async findByParentBacklogItemId(
    parentBacklogItemId: string,
  ): Promise<BacklogItem[]> {
    const backlogItems = await this.prisma.backlogItem.findMany({
      where: { parentBacklogItemId },
      orderBy: { createdAt: 'desc' },
    });

    return backlogItems.map((item) =>
      BacklogItem.reconstruct({
        id: item.id,
        productId: item.productId,
        sprintId: item.sprintId,
        parentBacklogItemId: item.parentBacklogItemId,
        title: item.title,
        description: item.description,
        priority: item.priority as BacklogItemPriority,
        status: item.status as BacklogItemStatus,
        assignedAgentId: item.assignedAgentId,
        storyPoint: item.storyPoint,
        artifactPath: item.artifactPath,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }),
    );
  }

  async save(backlogItem: BacklogItem): Promise<BacklogItem> {
    const created = await this.prisma.backlogItem.create({
      data: {
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
      },
    });

    return BacklogItem.reconstruct({
      id: created.id,
      productId: created.productId,
      sprintId: created.sprintId,
      parentBacklogItemId: created.parentBacklogItemId,
      title: created.title,
      description: created.description,
      priority: created.priority as BacklogItemPriority,
      status: created.status as BacklogItemStatus,
      assignedAgentId: created.assignedAgentId,
      storyPoint: created.storyPoint,
      artifactPath: created.artifactPath,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async update(backlogItem: BacklogItem): Promise<BacklogItem> {
    const updated = await this.prisma.backlogItem.update({
      where: { id: backlogItem.id },
      data: {
        sprintId: backlogItem.sprintId,
        parentBacklogItemId: backlogItem.parentBacklogItemId,
        title: backlogItem.title,
        description: backlogItem.description,
        priority: backlogItem.priority,
        status: backlogItem.status,
        assignedAgentId: backlogItem.assignedAgentId,
        storyPoint: backlogItem.storyPoint,
        artifactPath: backlogItem.artifactPath,
        updatedAt: backlogItem.updatedAt,
      },
    });

    return BacklogItem.reconstruct({
      id: updated.id,
      productId: updated.productId,
      sprintId: updated.sprintId,
      parentBacklogItemId: updated.parentBacklogItemId,
      title: updated.title,
      description: updated.description,
      priority: updated.priority as BacklogItemPriority,
      status: updated.status as BacklogItemStatus,
      assignedAgentId: updated.assignedAgentId,
      storyPoint: updated.storyPoint,
      artifactPath: updated.artifactPath,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.backlogItem.delete({
      where: { id },
    });
  }
}
