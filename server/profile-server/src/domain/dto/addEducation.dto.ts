import {  IsString, IsEmail,IsNotEmpty, IsOptional } from 'class-validator';


export class  EducationDto {

    @IsString({message:'title enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    school:string

    @IsString({message:'degree enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    degree:string

    @IsString({message:'fieldOfStudy enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    fieldOfStudy:string

    @IsString({message:'startTime enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    startTime:string

    @IsString({message:'endTime enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    endTime:string

    @IsString({message:'grade enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    grade:string

}