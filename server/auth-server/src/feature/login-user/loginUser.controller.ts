import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { loginUserService } from './loginUser.service';
import { LoginAuthDto } from 'src/domain/dto/loginUser.dto';
import express from 'express'; 


@Controller('auth')
export class loginUserController {
  constructor(private readonly loginUserService: loginUserService) {}

  @Post('login')
    registerUser(@Body() dto: LoginAuthDto, @Res({ passthrough: true }) res: express.Response) {
      const response = this.loginUserService.loginUser(dto);
      
      res.cookie('token', dto.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60,
      });
      return response;
    }
}
