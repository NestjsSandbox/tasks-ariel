import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';


@Module({
  imports: [TasksModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({whitelist: true}),
    },
  ],
})
export class AppModule {}
