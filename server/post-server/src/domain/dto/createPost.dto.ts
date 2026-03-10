import {  IsString, IsEmail,IsNotEmpty, IsOptional } from 'class-validator';


export class CreatePostDto {

    @IsString({message:'full name enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    post:string

    @IsString({message:'full name enter only string'})
    @IsOptional()
    media_url:string

}