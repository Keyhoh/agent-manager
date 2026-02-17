import { Module } from '@nestjs/common';
import { RepositoryModule } from '../../infrastructure/repository/repository.module';
import { ProjectService } from './project.service';

@Module({
  imports: [RepositoryModule],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ServiceModule {}
