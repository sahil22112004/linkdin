import { Body, Controller, Get, Post, Res, UnauthorizedException } from '@nestjs/common';
import { loginUserService } from './loginUser.service';
import { LoginAuthDto } from 'src/domain/dto/loginUser.dto';
import type { Response } from 'express';


@Controller('auth')
export class loginUserController {
  constructor(private readonly loginUserService: loginUserService) { }

  @Post('login')
  registerUser(@Body() dto: LoginAuthDto, @Res({ passthrough: true }) res: Response) {

    if (!dto.token) {
      throw new UnauthorizedException('Token missing');
    }

    const response = this.loginUserService.loginUser(dto);
    console.log("token is ", dto.token)

    res.cookie('token', dto.token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 60,
    });

    console.log("res is ", res)

    return response;
  }
}
