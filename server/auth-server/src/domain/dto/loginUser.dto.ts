import {  IsString, IsEmail,IsNotEmpty, IsOptional } from 'class-validator';


export class LoginAuthDto {

    @IsEmail()
    @IsNotEmpty({message:'this field cannot be emty'})
    email:string

    @IsString({message:'token enter only string'})
    token:string


}