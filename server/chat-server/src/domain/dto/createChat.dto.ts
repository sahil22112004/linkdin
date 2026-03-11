








import {  IsString, IsEmail,IsNotEmpty, IsOptional } from 'class-validator';


export class CreateAuthDto {

    @IsEmail()
    @IsNotEmpty({message:'this field cannot be emty'})
    chat_room_Id:string

    @IsString({message:'firebase id enter only string'})
    sender_Id:string

    @IsString({message:'full name enter only string'})
    reciver_Id:string

    @IsString({message:'full name enter only string'})
    chat:string
}


