import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";


@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    name: string;

    @Column()
    password: string;

    @OneToMany((_type) => Task, task => task.user, { eager : true })
    tasks: Task[];

}