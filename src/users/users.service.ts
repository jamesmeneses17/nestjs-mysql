import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createUser(user: createUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (userFound) {
      return new HttpException('Usuario ya existe', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find({
      relations: ['profile', 'posts'],
    });
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['post']
    });

    if (!userFound) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async deleteUser(id: number) {
    const userfound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userfound) {
      return new HttpException(
        'Usuario no esta en la lista',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.userRepository.delete({ id });
  }

  async updateUser(id: number, user: updateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }

  async createProfile(id: number, profile: CreateProfileDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const newProfile = this.profileRepository.create(profile);

    const saveProfile = await this.profileRepository.save(newProfile);

    userFound.profile = saveProfile;

    return this.userRepository.save(userFound);
  }
}
