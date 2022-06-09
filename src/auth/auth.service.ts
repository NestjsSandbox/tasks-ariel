//* auth.service.ts

import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
         @InjectRepository(User) 
         private userRepository: Repository<User>,
         
         private jwtService: JwtService,
    ){}

    async createUser(authCredentialsDto: CreateUserDto): Promise<void>{

        const {name , password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        console.log(`The salt is = ${salt}`);

        const hashedPassword = await bcrypt.hash(password,salt);
        console.log(`The hashed version = ${hashedPassword}`);

        const user = this.userRepository.create({
            name: name,
            password: hashedPassword,
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
    }//end createUser

    async signinUser(authCredentialsDto: CreateUserDto): Promise< { acessToken: string} >{
        const {name , password } = authCredentialsDto;

        const foundUser = await this.userRepository.findOne(
            {
                where: {
                    name: name,
                },
      });

        if (foundUser && (await bcrypt.compare(password, foundUser.password)) ){
            
            const payload: JwtPayloadInterface = { name };
            const acessToken: string = await this.jwtService.sign(payload);
            console.log('Login success');
            return { acessToken };
        } else {
            throw new UnauthorizedException(`Wrong credentials.`);
        }
    }//end signinUser
}//end AuthService
