import { Module } from '@nestjs/common';
import { ApplicationModule } from '../../application/application.module';
import { ProjectController } from './project/project.controller';
import { TaskController } from './task/task.controller';
import { SprintController } from './sprint/sprint.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [ProjectController, TaskController, SprintController],
})
export class ControllerModule {}
