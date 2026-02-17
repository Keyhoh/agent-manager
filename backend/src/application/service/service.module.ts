import { Module } from '@nestjs/common';
import { RepositoryModule } from '../../infrastructure/repository/repository.module';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';
import { SprintService } from './sprint.service';

@Module({
  imports: [RepositoryModule],
  providers: [ProjectService, TaskService, SprintService],
  exports: [ProjectService, TaskService, SprintService],
})
export class ServiceModule {}
