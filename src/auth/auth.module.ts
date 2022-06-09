//* auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [ 
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'someSecret',
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([User])
   ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  //Exporting the following JwtStrategy & PassportModule allows 
  //any module importing AuthModule to enjoy the validation mechanizem
  exports: [JwtStrategy, PassportModule], 
})
export class AuthModule {}
