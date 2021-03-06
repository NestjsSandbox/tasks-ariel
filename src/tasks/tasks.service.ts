// * tasks.service.ts

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './enums/task-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class TasksService {
 
  private logger = new Logger('TasksService', {timestamp: true});

    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
        ){}

  //Create a Task
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
        title,
        description,
        status: TaskStatus.OPEN,
        user,
    });

    await this.taskRepository.save(task);

    return task;
  }//end createTask

  //Get all the tasks
  async getTasks({ status, search }: GetTasksFilterDto, user: User): Promise<Task[]> {

    const query = this.taskRepository.createQueryBuilder('qtask');

    query.where( {user} );  //filters only the tasks that have the specific user object passed as input

    if (status){
      query.andWhere('qtask.status = :tStatus', { tStatus: status} );
    }

    if (search){
      query.andWhere(
        // The Case senstive version:
        //* 'qtask.title LIKE :tSearch OR qtask.description LIKE :tSearch',

        //The non-case sesntive ver
        '(LOWER(qtask.title) LIKE LOWER(:tSearch) OR LOWER(qtask.description) LIKE LOWER(:tSearch))',
        { tSearch: `%${search}%`}, 
      );
    }

    try {
      
      const tasks = query.getMany();
      return tasks;

    } catch (error) {
      this.logger.error(`Failed fetching tasks for user "${user.name}". Filters status: ${status} and search: ${search}`, error.stack);

      throw new InternalServerErrorException();
    }
  }
  

//Get a Task by its ID
         async getTaskById(searchId: string, user: User): Promise<Task> {

          const foundTask = await this.taskRepository.findOne(
                {
                    where: {
                        id: searchId,
                        user: user
                    },
                }
          )

          if (!foundTask){
              throw new NotFoundException(`The task with id ${searchId} wasnt found`);
          }
            
          return foundTask;
            
        }//end getTaskById



  //Delete a Task by its ID
  async deleteTaskById(id: string, user: User): Promise<void> {

    // const task = await this.getTaskById(id,user);

    // if (!task) {
    //     throw new NotFoundException(`Can not delete, the task with id ${id} wasnt found`);
    // }

    const result = await this.taskRepository.delete( {id, user}); 

    if (result.affected === 0){
        throw new NotFoundException(`Cant delete - the task with id ${id} wasnt found`);
    }

  }

  //Update the status of a task by its ID
 // updateTaskStatus(id: string, newStatus: TaskStatus): Task {
  async updateTaskStatus(id: string, newStatus: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id,user);

    if (!task) {
        throw new NotFoundException(`Can not update, the task with id ${id} wasnt found`);
    }

    task.status = newStatus;

    return this.taskRepository.save(task);
  }
}
