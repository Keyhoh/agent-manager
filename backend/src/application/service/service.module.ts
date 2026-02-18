import { Module } from '@nestjs/common';
import { RepositoryModule } from '@/infrastructure/repository/repository.module';
import { ProductService } from './product.service';
import { BacklogItemService } from './backlog-item.service';
import { SprintService } from './sprint.service';

@Module({
  imports: [RepositoryModule],
  providers: [ProductService, BacklogItemService, SprintService],
  exports: [ProductService, BacklogItemService, SprintService],
})
export class ServiceModule {}
