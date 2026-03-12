
import { IsNotEmpty, IsUUID } from 'class-validator';


export class CheckId {

    @IsUUID('all', { message: 'The ID must be a valid UUID string' }) 
    @IsNotEmpty({ message: 'This field cannot be empty' }) 
    id: string;

}


