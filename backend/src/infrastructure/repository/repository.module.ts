import { Module } from '@nestjs/common';
import { PROJECT_REPOSITORY } from '../../domain/repository/project.repository';
import { TASK_REPOSITORY } from '../../domain/repository/task.repository';
import { SPRINT_REPOSITORY } from '../../domain/repository/sprint.repository';
import { PrismaProjectRepository } from './prisma/project.prisma.repository';
import { PrismaTaskRepository } from './prisma/task.prisma.repository';
import { PrismaSprintRepository } from './prisma/sprint.prisma.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: PROJECT_REPOSITORY,
      useClass: PrismaProjectRepository,
    },
    {
      provide: TASK_REPOSITORY,
      useClass: PrismaTaskRepository,
    },
    {
      provide: SPRINT_REPOSITORY,
      useClass: PrismaSprintRepository,
    },
  ],
  exports: [PROJECT_REPOSITORY, TASK_REPOSITORY, SPRINT_REPOSITORY],
})
export class RepositoryModule {}
