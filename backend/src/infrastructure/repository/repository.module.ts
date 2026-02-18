import { Module } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '@/domain/repository/product.repository';
import { BACKLOG_ITEM_REPOSITORY } from '@/domain/repository/backlog-item.repository';
import { SPRINT_REPOSITORY } from '@/domain/repository/sprint.repository';
import { PrismaProductRepository } from './prisma/product.prisma.repository';
import { PrismaBacklogItemRepository } from './prisma/backlog-item.prisma.repository';
import { PrismaSprintRepository } from './prisma/sprint.prisma.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
    {
      provide: BACKLOG_ITEM_REPOSITORY,
      useClass: PrismaBacklogItemRepository,
    },
    {
      provide: SPRINT_REPOSITORY,
      useClass: PrismaSprintRepository,
    },
  ],
  exports: [PRODUCT_REPOSITORY, BACKLOG_ITEM_REPOSITORY, SPRINT_REPOSITORY],
})
export class RepositoryModule {}
