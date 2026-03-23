import {  IsString, IsEmail,IsNotEmpty, IsOptional } from 'class-validator';


export class ExperenceDto {

    @IsString({message:'title enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    title:string

    @IsString({message:'employmentType enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    employmentType:string

    @IsString({message:'company enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    company:string

    @IsString({message:'location enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    location:string

    @IsString({message:'startTime enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    startTime:string

    @IsString({message:'endTime enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    endTime:string

}