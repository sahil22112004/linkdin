import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { EducationDto } from '../../../domain/dto/addEducation.dto';
import { Education } from 'src/domain/entities/education.entity';

@Injectable()
export class EducationService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Education) private educationRepository: Repository<Education>,
    ) {}

    async addEducation(dto: EducationDto, userId: string) {

        const { school, degree, fieldOfStudy, startTime, endTime, grade } = dto;

        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        const education = this.educationRepository.create({
            school,
            degree,
            fieldOfStudy,
            startTime,
            endTime,
            grade,
            userid: user
        });

        await this.educationRepository.save(education);

        return {
            message: 'Education added successfully',
            data: education
        };
    }
}