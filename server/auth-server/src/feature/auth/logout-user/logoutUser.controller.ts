import { Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('auth')
export class LogoutUserController {

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {

    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false
    });

    return {
      message: 'Logged out successfully'
    };
  }
}