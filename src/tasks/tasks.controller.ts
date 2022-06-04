import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {

  constructor(private taskService: TasksService){}

  //Create a task
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task{
    return this.taskService.createTask(createTaskDto);
  }

  //Get all tasks
  @Get()
  getAllTasks(): Task[]{
    return this.taskService.getAllTasks();
  }


  //Get a task by id
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task{
    return this.taskService.getTaskById(id);
  }

  //Delete task by Id
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void{
    return this.taskService.deleteTaskById(id); // THe 'return' is optional since we are returning void
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task{
      return this.taskService.updateTaskStatus(id, status);
  }

}
