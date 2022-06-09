//* auth.controller.ts

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}

    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<void>{
        
       // console.log(`body = `, createUserDto);
        return await this.authService.createUser(createUserDto);
      }

    @Post('/signin')
    async signin(@Body() createUserDto: CreateUserDto): Promise< { acessToken: string} >{
        return await this.authService.signinUser(createUserDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req){
      console.log(req); 
    }

}
