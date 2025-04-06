import { Controller, Post, Body } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() newUser: createUserDto) {
    return this.userService.createUser(newUser);
  }
}
