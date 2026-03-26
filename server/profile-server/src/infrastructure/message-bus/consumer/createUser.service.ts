import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../../../domain/entities/user.entity"
import { Repository } from "typeorm"

@Injectable()
export class CreateUserService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async CreateUser(userInfo:any){

    console.log("user is",userInfo)
    const createdUser = this.userRepo.create({
        id:userInfo.user_Id,
        email:userInfo.email,
        fullname : userInfo.fullName
        
    })
    console.log("craete d sa", createdUser)

    await this.userRepo.save(createdUser)

    return {message:"successfully created"}
  }

 }