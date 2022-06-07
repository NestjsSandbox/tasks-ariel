import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    @MaxLength(6)
    @MinLength(2)
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(8)
    @MinLength(3)
    //Using regex to add rules to password:
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password is weak'})
    //Passwords will contain at least 1 upper case letter
    //Passwords will contain at least 1 lower case letter
    //Passwords will contain at least 1 number or special character
    //There is no length validation (min, max) in this regex!
    password: string;
}