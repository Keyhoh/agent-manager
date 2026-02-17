import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [RepositoryModule],
  exports: [RepositoryModule],
})
export class InfrastructureModule {}
