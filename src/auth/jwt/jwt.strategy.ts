//* jwt.startegy.ts

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { User } from "../entities/user.entity";
import { JwtPayloadInterface } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        @InjectRepository(User) 
        private userRepository: Repository<User>
    ){

        super({ //We call super because we constructed a class derived from another class (aka 'super')
                 //In the super method we initialize values into the super class (PassportStartegy in this case)

                 secretOrKey: 'someSecret',
                 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayloadInterface): Promise<User>{
        const {name} = payload;

        console.log(`user is ${name}`);
        
        const foundUser: User = await this.userRepository.findOne({
            where: {
                name: name,
            },
        });
        
        console.log(`foundUser is ${foundUser}`);

        if (!foundUser) {
            throw new UnauthorizedException("Hi guys !");
        }

        return foundUser;
    }//end validate

}//end JwtStartegy class