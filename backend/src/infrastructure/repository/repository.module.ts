import { Module } from '@nestjs/common';
import { PROJECT_REPOSITORY } from '../../domain/repository/project.repository';
import { PrismaProjectRepository } from './prisma/project.prisma.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: PROJECT_REPOSITORY,
      useClass: PrismaProjectRepository,
    },
  ],
  exports: [PROJECT_REPOSITORY],
})
export class RepositoryModule {}
