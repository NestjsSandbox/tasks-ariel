//* auth.service.ts

import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {

    constructor( @InjectRepository(User) private userRepository: Repository<User>){}

    async createUser(authCredentialsDto: CreateUserDto): Promise<void>{

        const {name , password } = authCredentialsDto;

        const user = this.userRepository.create({
            name: name,
            password: password,
        });

        try {
            await this.userRepository.save(user);
        } catch(error) {
            console.error(error.code)
            if (error.code === '23505'){
                throw new ConflictException('Username already exists, try other');
            } else {
                throw new InternalServerErrorException('Username given caused server error');
            }
        }
    }
}
