import { Module } from '@nestjs/common';
import { ApplicationModule } from '../../application/application.module';
import { ProjectController } from './project/project.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [ProjectController],
})
export class ControllerModule {}
