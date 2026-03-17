import {  IsString, IsEmail,IsNotEmpty, IsOptional } from 'class-validator';


export class CreateCommentDto {

    @IsString({message:'comment id enter only string'})
    @IsOptional()
    comment_id:string

    @IsString({message:'comment enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    comment:string

}