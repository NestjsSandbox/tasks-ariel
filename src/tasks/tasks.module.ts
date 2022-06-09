//* tasks.module.ts

import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Task]), AuthModule ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
