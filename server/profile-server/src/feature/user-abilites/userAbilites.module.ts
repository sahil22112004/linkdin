import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Education } from '../../domain/entities/education.entity';
import { Experence } from '../../domain/entities/experence.entity';
import { ExperenceService } from './add-education/addExperence.service';
import { EducationService } from './add-experence/addEductaion.service';
import { EducationController } from './add-experence/addExperence.controller';
import { FolllowController } from './add-education/addExperence.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User,Education,Experence])],
  controllers: [
    FolllowController,
    EducationController
  ],
  providers: [
    EducationService,
    ExperenceService

  ],
})
export class userAbilityModule {}
