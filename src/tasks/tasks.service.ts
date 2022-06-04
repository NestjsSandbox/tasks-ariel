import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dtos/create-task.dto';

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

  //Get a Task by its ID
  getTaskById(id: string): Task {
    return this.tasks.find((element) => element.id === id);
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
    this.tasks = this.tasks.filter((taskToDelete) => taskToDelete.id !== id);
  }

  //Update the status of a task by its ID
  updateTaskStatus(id: string, newStatus: TaskStatus): Task {
    const task: Task = this.getTaskById(id);

    task.status = newStatus;

    return task;
  }
}
