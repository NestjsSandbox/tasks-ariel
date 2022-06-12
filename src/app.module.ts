import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
//import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
            ConfigModule.forRoot({
              isGlobal: true,
              envFilePath: `.env.${process.env.NODE_ENV}`,
              //envFilePath: `.env.dev`,
            }),
            TasksModule,
        //Importing and configuring the TYpeOrm into 
        //this app.module (the root module)
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432, 
              username: 'postgres',
              password: 'postgres',
              database: 'task-management',
              entities: [Task],
              autoLoadEntities: true,
              synchronize: true
            }),
        AuthModule,
          ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({whitelist: true}),
    },
  ],
})

export class AppModule {
  // The TypeORM DataSource and EntityManager objects are now available
  // to inject across the entire project. Example:
  
  // constructor(private dataSource: DataSource) {}
}

