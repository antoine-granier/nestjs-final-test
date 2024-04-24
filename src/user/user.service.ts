import { Injectable } from '@nestjs/common';
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
                email: email,
            });
            return await this.usersRepository.save(user);
        } catch (err) {
            return null;
        }
    }

    async getUser(email: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({
            email: email,
        });
        return user;
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({
            id: id,
        });
        return user;
    }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    resetData(): Promise<void> {
        return this.usersRepository.clear();
    }
}
