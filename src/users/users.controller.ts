import { Controller, Post, Body, Get } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}


  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() newUser: createUserDto): Promise<User> {
    return this.userService.createUser(newUser);
  }


}
