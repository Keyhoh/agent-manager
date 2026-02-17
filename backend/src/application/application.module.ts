import { Module } from '@nestjs/common';
import { ServiceModule } from './service/service.module';
import { UsecaseModule } from './usecase/usecase.module';

@Module({
  imports: [ServiceModule, UsecaseModule],
  exports: [ServiceModule, UsecaseModule],
})
export class ApplicationModule {}
