import { Body, Controller, Post, Res } from '@nestjs/common';
import { GoogleLoginService } from './google-login.service';
import { GoogleAuthDto } from '../../domain/dto/googleUser.dto';
import express from 'express'; 


@Controller('google-login')
export class GoogleLoginController {
  constructor(private readonly googleLoginService: GoogleLoginService) { }

  @Post()
  registerUser(@Body() dto: GoogleAuthDto, @Res({ passthrough: true }) res: express.Response) {
    const response = this.googleLoginService.registerUser(dto);
    
    res.cookie('token', dto.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });
    return response;
  }
}
