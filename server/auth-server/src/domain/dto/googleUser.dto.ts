import {  IsString, IsEmail,IsNotEmpty, IsOptional } from 'class-validator';


export class GoogleAuthDto {

    @IsEmail()
    @IsNotEmpty({message:'this field cannot be emty'})
    email:string

    @IsString({message:'firebase id enter only string'})
    firebase_id:string

    @IsString({message:'token enter only string'})
    token:string

    @IsString({message:'full name enter only string'})
    @IsOptional()
    fullname:string

}