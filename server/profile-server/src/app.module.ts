import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from "dotenv"
import { User } from './domain/entities/user.entity';
import { UserInbox } from './domain/entities/userInbox.entity';
import { userModule } from './feature/user/user.module';


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
      entities: [User, UserInbox],
      synchronize: false,
    }),
    userModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
