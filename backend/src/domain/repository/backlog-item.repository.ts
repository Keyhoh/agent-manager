import { BacklogItem } from '../model/backlog-item.entity';

export interface BacklogItemRepository {
  findAll(): Promise<BacklogItem[]>;
  findById(id: string): Promise<BacklogItem | null>;
  findByProductId(productId: string): Promise<BacklogItem[]>;
  findBySprintId(sprintId: string): Promise<BacklogItem[]>;
  findByParentBacklogItemId(
    parentBacklogItemId: string,
  ): Promise<BacklogItem[]>;
  save(backlogItem: BacklogItem): Promise<BacklogItem>;
  update(backlogItem: BacklogItem): Promise<BacklogItem>;
  delete(id: string): Promise<void>;
}

export const BACKLOG_ITEM_REPOSITORY = Symbol('BACKLOG_ITEM_REPOSITORY');
