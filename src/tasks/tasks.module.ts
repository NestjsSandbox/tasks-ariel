//* tasks.module.ts

import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule,
    TypeOrmModule.forFeature([Task]),
    AuthModule,
   ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
