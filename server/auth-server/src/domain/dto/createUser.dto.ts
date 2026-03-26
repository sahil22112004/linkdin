import {  IsString, IsEmail,IsNotEmpty, IsOptional } from 'class-validator';


export class CreateAuthDto {

    @IsEmail()
    @IsNotEmpty({message:'this field cannot be emty'})
    email:string

    @IsString({message:'firebase id enter only string'})
    firebase_id:string

    @IsString({message:'full name enter only string'})
    fullname:string

}