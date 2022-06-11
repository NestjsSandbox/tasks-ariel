//* user.entity.ts

import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";


@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    name: string;

    @Column()
    @Exclude({toPlainOnly: true}) // Whenever we dump this "Task" object to plain-text (i.e. JSON) then 
    //we want to exclude this user EntityPropertyNotFoundError.   
    password: string;

    @OneToMany((_type) => Task, (task) => task.user, { eager : false })
    tasks: Task[];

}