import { Module } from '@nestjs/common';
import { ApplicationModule } from '@/application/application.module';
import { ProductController } from './product/product.controller';
import { BacklogItemController } from './backlog-item/backlog-item.controller';
import { SprintController } from './sprint/sprint.controller';
import { ReviewController } from './review/review.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [
    ProductController,
    BacklogItemController,
    SprintController,
    ReviewController,
  ],
})
export class ControllerModule {}
