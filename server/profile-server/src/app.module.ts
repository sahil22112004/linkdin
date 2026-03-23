import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from "dotenv"
import { User } from './domain/entities/user.entity';
import { UserInbox } from './domain/entities/userInbox.entity';
import { userModule } from './feature/user/user.module';
import { Follow } from './domain/entities/follow.entity';
import { Connection } from './domain/entities/connection.entity';
import { userAbilityModule } from './feature/user-abilites/userAbilites.module';
import { Experence } from './domain/entities/experence.entity';
import { Education } from './domain/entities/education.entity';


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
      entities: [User, UserInbox,Follow,Connection,Education,Experence],
      synchronize: false,
    }),
    userModule,
    userAbilityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
