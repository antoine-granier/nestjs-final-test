import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) {}

    async addTask(
        name: string,
        userId: number,
        priority: number,
    ): Promise<Task> {
        try {
            const task = this.tasksRepository.create({
                name,
                userId,
                priority,
            });

            return this.tasksRepository.save(task);
        } catch (error) {
            return error;
        }
    }

    async getTaskByName(name: string): Promise<Task | undefined> {
        return this.tasksRepository.findOne({
            where: { name },
        });
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        return this.tasksRepository.find({
            where: { userId },
        });
    }

    async resetData(): Promise<void> {
        await this.tasksRepository.clear();
    }
}
