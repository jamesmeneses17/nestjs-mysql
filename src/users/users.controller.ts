import { Controller, Post, Body, Get,Param } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}


  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number ): Promise<User | null> {
    console.log(id)
    console.log(typeof id)

    return this.usersService.getUser(id);
  }


  @Post()
  createUser(@Body() newUser: createUserDto): Promise<User> {
    return this.usersService.createUser(newUser);
  }


}
