import { Module } from '@nestjs/common';
import { RepositoryModule } from '@/infrastructure/repository/repository.module';
import { ProductService } from './product.service';
import { BacklogItemService } from './backlog-item.service';
import { SprintService } from './sprint.service';
import { ReviewService } from './review.service';

@Module({
  imports: [RepositoryModule],
  providers: [ProductService, BacklogItemService, SprintService, ReviewService],
  exports: [ProductService, BacklogItemService, SprintService, ReviewService],
})
export class ServiceModule {}
