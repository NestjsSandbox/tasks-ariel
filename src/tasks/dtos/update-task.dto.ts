import { TaskStatus } from "../enums/task-status.enum";
import { IsEnum } from "class-validator";

export class UpdateTaskDto{

    @IsEnum(TaskStatus)
    status: TaskStatus;

}