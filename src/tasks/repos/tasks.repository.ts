import {EntityRepository, Repository} from 'typeorm';
import {Task} from '../entities/task.entity'

@EntityRepository()
export class TasksRepository extends Repository<Task> {

}