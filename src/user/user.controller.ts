import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':email')
    getUserByEmail(@Param('email') email: string) {
        return this.userService.getUser(email);
    }

    @Post()
    async addUser(@Body() user: { email: string }): Promise<User> {
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) {
            throw new HttpException('invalid email', HttpStatus.BAD_REQUEST);
        }
        const allUsers = await this.userService.getUsers();
        if (allUsers.find((u) => u.email === user.email)) {
            throw new HttpException('user already exists', HttpStatus.CONFLICT);
        }
        return await this.userService.addUser(user.email);
    }
}
