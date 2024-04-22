import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async addUser(email: string): Promise<User> {
        try {
            const user = this.usersRepository.create({
                email: email
            })
            return await this.usersRepository.save(user)
        } catch(err) {
            return err;
        }
    }

    async getUser(email: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({
            email: email
        })
        return user;
    }

    async getUsers(): Promise<User[]> {
        const users = await this.usersRepository.find()
        return users
    }

    resetData(): Promise<void> {
        return this.usersRepository.clear()
    }
}
