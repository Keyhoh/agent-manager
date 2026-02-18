import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BacklogItem } from '@/domain/model/backlog-item.entity';
import {
  type BacklogItemRepository,
  BACKLOG_ITEM_REPOSITORY,
} from '@/domain/repository/backlog-item.repository';

/**
 * BacklogItemService: 機能的凝集
 * 単一のRepositoryに対する操作を提供
 */
@Injectable()
export class BacklogItemService {
  constructor(
    @Inject(BACKLOG_ITEM_REPOSITORY)
    private readonly backlogItemRepository: BacklogItemRepository,
  ) {}

  async save(backlogItem: BacklogItem): Promise<BacklogItem> {
    return this.backlogItemRepository.save(backlogItem);
  }

  async findById(id: string): Promise<BacklogItem> {
    const backlogItem = await this.backlogItemRepository.findById(id);
    if (!backlogItem) {
      throw new NotFoundException(`BacklogItem with ID ${id} not found`);
    }
    return backlogItem;
  }

  async findAll(): Promise<BacklogItem[]> {
    return this.backlogItemRepository.findAll();
  }

  async findByProductId(productId: string): Promise<BacklogItem[]> {
    return this.backlogItemRepository.findByProductId(productId);
  }

  async findBySprintId(sprintId: string): Promise<BacklogItem[]> {
    return this.backlogItemRepository.findBySprintId(sprintId);
  }

  async findByParentBacklogItemId(
    parentBacklogItemId: string,
  ): Promise<BacklogItem[]> {
    return this.backlogItemRepository.findByParentBacklogItemId(
      parentBacklogItemId,
    );
  }

  async update(backlogItem: BacklogItem): Promise<BacklogItem> {
    return this.backlogItemRepository.update(backlogItem);
  }

  async delete(id: string): Promise<void> {
    await this.backlogItemRepository.delete(id);
  }
}
