import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  //Create a Task
  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  //Get all the tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {

    const {status, search} = filterDto;

    let filteredTasks: Task[] = this.getAllTasks();

    if (status) {
      filteredTasks = filteredTasks.filter((element) => element.status === status);
    }

    if (search) {
      filteredTasks = filteredTasks.filter( (element) => {
        if ( element.title.includes(search) || element.description.includes(search)) {
          return true;
        }
         return false;
    });
    }

    return filteredTasks;
  }


  //Get a Task by its ID
  getTaskById(id: string): Task {
    const foundTask: Task =  this.tasks.find((element) => element.id === id);

    if (!foundTask){
        throw new NotFoundException(`The task with id ${id} wasnt found`);
    } else {
      return foundTask;
    }
  }

  //Delete a Task by its ID
  deleteTaskById(id: string): void {
    // Method-1:  Deleteing using 'splice'
    // const index: number = this.tasks
    //   .map((targetTask) => targetTask.id)
    //   .indexOf(id);
    // console.log(`deleted task index = ${index}`);
    // this.tasks.splice(index, 1); //delete 1 item at location 'index'

    // Method-2: Deleteing using the filter array method to create a new array (excluding the item with the id) and replace the old one with the new

    this.getTaskById(id); //If the id doesnt exist then the function throws a 404 error and breaks from this method (wont continue to next line)

    this.tasks = this.tasks.filter((taskToDelete) => taskToDelete.id !== id);
  }

  //Update the status of a task by its ID
 // updateTaskStatus(id: string, newStatus: TaskStatus): Task {
  updateTaskStatus(id: string, newStatus: TaskStatus): Task {
    const task: Task = this.getTaskById(id);

    task.status = newStatus;

    return task;
  }
}
