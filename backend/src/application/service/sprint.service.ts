import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Sprint } from '@/domain/model/sprint.entity';
import {
  type SprintRepository,
  SPRINT_REPOSITORY,
} from '@/domain/repository/sprint.repository';

/**
 * SprintService: 機能的凝集
 * 単一のRepositoryに対する操作を提供
 */
@Injectable()
export class SprintService {
  constructor(
    @Inject(SPRINT_REPOSITORY)
    private readonly sprintRepository: SprintRepository,
  ) {}

  async save(sprint: Sprint): Promise<Sprint> {
    return this.sprintRepository.save(sprint);
  }

  async findById(id: string): Promise<Sprint> {
    const sprint = await this.sprintRepository.findById(id);
    if (!sprint) {
      throw new NotFoundException(`Sprint with ID ${id} not found`);
    }
    return sprint;
  }

  async findAll(): Promise<Sprint[]> {
    return this.sprintRepository.findAll();
  }

  async findByProductId(productId: string): Promise<Sprint[]> {
    return this.sprintRepository.findByProductId(productId);
  }

  async update(sprint: Sprint): Promise<Sprint> {
    return this.sprintRepository.update(sprint);
  }

  async delete(id: string): Promise<void> {
    await this.sprintRepository.delete(id);
  }
}
