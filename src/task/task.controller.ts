import { UserService } from './../user/user.service';
import { Controller, Get, Post, Param, Body, HttpStatus, HttpException, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
    constructor(
        private taskService: TaskService,
        private userService: UserService
    ) {}

    @Get('user/:userId')
    async getUserTasks(@Param('userId', ParseIntPipe) userId: number) {
        if (!userId || userId < 0 || isNaN(userId)) {
            throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
        }

        const tasks = await this.taskService.getUserTasks(userId);
        if (tasks.length === 0) {
            return [];
        }
        return tasks;
    }

    @Post()
    async addTask(@Body() taskData: { name: string; userId: number; priority: number }) {
        
        if (!taskData.name || !taskData.userId || isNaN(+taskData.userId) || +taskData.userId < 0|| isNaN(+taskData.priority) || +taskData.priority < 0) {
            throw new HttpException('Invalid task data', HttpStatus.BAD_REQUEST);
        }
        

        const isExist = this.userService.getUserById(+taskData.userId);
        if(!isExist){
            throw new HttpException('Invalid task data', HttpStatus.BAD_REQUEST);
        }

        const task = await this.taskService.addTask(taskData.name, +taskData.userId, +taskData.priority);
        if (!task) {
            throw new HttpException('Task could not be created', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return task;
    }
}
