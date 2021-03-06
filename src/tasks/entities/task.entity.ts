//* task.entity.ts

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { TaskStatus } from "../enums/task-status.enum";

@Entity()
export class Task{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne((_type) => User, (user) => user.tasks, { eager : true })
    user: User;
    
}