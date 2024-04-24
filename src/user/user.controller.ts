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
import { checkParams } from '../utils';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':email')
    getUserByEmail(@Param('email') email: string) {
        if (!checkParams(email, "email")) {
            throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
        }
        return this.userService.getUser(email);
    }

    @Post()
    async addUser(@Body() user: { email: string }): Promise<User> {
        if (!checkParams(user.email, "email")) {
            throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
        }
        const userExist = await this.userService.getUser(user.email);
        if (userExist) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        const createdUser = await this.userService.addUser(user.email);
        if (!createdUser) {
            throw new HttpException(
                'User could not be created',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return createdUser;
    }
}
