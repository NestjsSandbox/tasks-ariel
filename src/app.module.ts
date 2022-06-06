import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TasksModule,
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432, 
              username: 'postgres',
              password: 'postgres',
              database: 'task-management',
              autoLoadEntities: true,
              synchronize: true
            }),
          ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({whitelist: true}),
    },
  ],
})
export class AppModule {}
