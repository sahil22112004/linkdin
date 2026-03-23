import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { ExperenceDto } from 'src/domain/dto/addExperence.dto';
import { Experence } from '../../../domain/entities/experence.entity';

@Injectable()
export class ExperenceService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Experence) private expRepository: Repository<Experence>,
    ) {}

    async addExperience(dto: ExperenceDto, userId: string) {

        const { title, employmentType, startTime, endTime, location ,company} = dto;

        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        const exp = this.expRepository.create({
            title,
            employmentType,
            location,
            company,
            startTime,
            endTime,
            userid: user
        });

        await this.expRepository.save(exp);

        return {
            message: 'Experience added successfully',
            data: exp
        };
    }
}