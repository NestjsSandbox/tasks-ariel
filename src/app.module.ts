//* app.module.ts

import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidation } from './config.schema';


@Module({
  imports: [
            ConfigModule.forRoot({
              isGlobal: true,
              envFilePath: `.env.${process.env.NODE_ENV}`,
              validationSchema: configValidation,
            }),
            TasksModule,

            //We use TypeOrmModule with forRootAsync because the env vars are not hardcoded as 
            //before in the forRoot (they were instantly available), now they are in an .env file
            //and the runtime needs to wait for the file to be read.
            TypeOrmModule.forRootAsync({
              imports: [ConfigModule], //Here we tell the DI from the useFActory what module we dependend on.
              inject: [ConfigService],  //Here we tell the DI what we need to inject from the imported modules.
              useFactory:async (configService: ConfigService) => { //Here we do DI of ConfigService.
                return { //the contents below are what is returned to the TypeOrmModule
                         // after the async finished and got what it was waiting for.
                    type: 'postgres',
                    autoLoadEntities: true,
                    synchronize: true,
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                }
              }//end useFActory
            }),

            // TypeOrmModule.forRoot({
            //   type: 'postgres',
            //   //migrated the following properties to the .env.dev file
            //   //host: 'localhost',
            //   // port: 5432, 
            //   // username: 'postgres',
            //   // password: 'postgres',
            //   // database: 'task-management',
            //   entities: [Task],
            //   autoLoadEntities: true,
            //   synchronize: true
            // }),
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

