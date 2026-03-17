import {  IsString, IsEmail,IsNotEmpty, IsOptional } from 'class-validator';


export class updateUserDto {

    @IsString({message:'discription enter only string'})
    @IsOptional()
    description:string

    @IsString({message:'full name enter only string'})
    @IsOptional()
    fullname:string

    @IsString({message:'state enter only string'})
    @IsOptional()
    state:string

    @IsString({message:'country enter only string'})
    @IsOptional()
    country:string

}