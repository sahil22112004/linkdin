import {  IsString, IsEmail,IsNotEmpty, IsOptional } from 'class-validator';


export class updateUserDto {

    @IsString({message:'firebase id enter only string'})
    description:string

    @IsString({message:'full name enter only string'})
    @IsOptional()
    fullname:string

}