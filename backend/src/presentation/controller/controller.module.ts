import { Module } from '@nestjs/common';
import { ApplicationModule } from '@/application/application.module';
import { ProductController } from './product/product.controller';
import { BacklogItemController } from './backlog-item/backlog-item.controller';
import { SprintController } from './sprint/sprint.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [ProductController, BacklogItemController, SprintController],
})
export class ControllerModule {}
