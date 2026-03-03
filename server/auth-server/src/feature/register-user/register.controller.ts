import { Body, Controller, Get, Post } from '@nestjs/common';
import { registerUserService } from './register.service';
import { CreateAuthDto } from '../../domain/dto/createUser.dto';

@Controller('auth')
export class registerUserController {
  constructor(private readonly registerUserService: registerUserService) {}

  @Post('register')
  registerUser(@Body() dto: CreateAuthDto) {
    return this.registerUserService.registerUser(dto);
  }
}
