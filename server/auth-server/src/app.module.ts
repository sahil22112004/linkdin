import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { config } from "dotenv";
import { userModule } from './feature/user/user.module';
import { authModule } from './feature/auth/auth.module';
import { UsersOutbox } from './domain/entities/userOutBox.entity';


config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User,UsersOutbox],
      synchronize: false,
    }),
    authModule,
    userModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
