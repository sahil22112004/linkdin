import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { adminAuth } from './firebaseAdmin';
import { Response } from 'express';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const res:Response = context.switchToHttp().getResponse();
    const token = request.cookies?.token;

    if (!token) {
      throw new UnauthorizedException('No token provided in firebase');
    }

    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      res.cookie('token', null)
      throw new UnauthorizedException('Invalid or expired token');
      

    }
  }
}