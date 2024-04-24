import { UserService } from './../user/user.service';
import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    HttpStatus,
    HttpException,
    ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { checkParams } from '../utils';

@Controller()
export class TaskController {
    constructor(
        private taskService: TaskService,
        private userService: UserService,
    ) {}

    @Get('user/:userId')
    async getUserTasks(@Param('userId', ParseIntPipe) userId: number) {
        if (!checkParams(userId, "number")) {
            throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
        }

        return await this.taskService.getUserTasks(userId);
    }

    @Post()
    async addTask(
        @Body() taskData: { name: string; userId: number; priority: number },
    ) {
        if (
            !checkParams(taskData.name, "string") ||
            !checkParams(taskData.userId, "number") ||
            !checkParams(taskData.priority, "number")
        ) {
            throw new HttpException(
                'Invalid task data',
                HttpStatus.BAD_REQUEST,
            );
        }

        const isExist = this.userService.getUserById(+taskData.userId);
        if (!isExist) {
            throw new HttpException(
                'Invalid user',
                HttpStatus.BAD_REQUEST,
            );
        }

        const task = await this.taskService.addTask(
            taskData.name,
            +taskData.userId,
            +taskData.priority,
        );
        if (!task) {
            throw new HttpException(
                'Task could not be created',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return task;
    }
}
