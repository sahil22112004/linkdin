import {  IsString, IsEmail,IsNotEmpty, IsOptional } from 'class-validator';


export class CreateLikeDto {

    @IsString({message:'post id enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    post_Id:string

    @IsString({message:'user id enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    user_Id:string

}