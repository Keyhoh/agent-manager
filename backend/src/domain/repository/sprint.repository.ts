import { Sprint } from '../model/sprint.entity';

export interface SprintRepository {
  findAll(): Promise<Sprint[]>;
  findById(id: string): Promise<Sprint | null>;
  findByProductId(productId: string): Promise<Sprint[]>;
  save(sprint: Sprint): Promise<Sprint>;
  update(sprint: Sprint): Promise<Sprint>;
  delete(id: string): Promise<void>;
}

export const SPRINT_REPOSITORY = Symbol('SPRINT_REPOSITORY');
