//* tasks.controller.ts

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

  constructor(private taskService: TasksService){}

  //Create a task
  @Post()
  async createTask(
      @Body() createTaskDto: CreateTaskDto,
      @GetUser() user:User,
  ): Promise<Task>{
    //console.log(`body = `, createTaskDto);
    return await this.taskService.createTask(createTaskDto,user);
  }

  //Get tasks either by filter or if no filter then get all tasks
  @Get()
  async getTasks(
      @Query() filterDto: GetTasksFilterDto,
      @GetUser() user:User,
  ): Promise<Task[]>{
    return this.taskService.getTasks(filterDto,user);
  }

  //Get a task by id
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task>{
    return this.taskService.getTaskById(id);
  }

  //Delete task by Id
  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<void>{
    return this.taskService.deleteTaskById(id); // THe 'return' is optional since we are returning void
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task>{
      const {status} = updateTaskDto;
      return this.taskService.updateTaskStatus(id, status);
  }

}
