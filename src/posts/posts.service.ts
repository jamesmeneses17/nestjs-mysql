import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { HttpStatus } from '@nestjs/common/enums';



@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private usersService: UsersService) {}

    async createPost(post: CreatePostDto) {
        const userFound = await this.usersService.getUser(post.authorId);
      
        if (!userFound) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND); // Cambiado a throw
        }
      
        const newPost = this.postRepository.create(post);
        return this.postRepository.save(newPost);
      }

      getPost(){
        return this.postRepository.find({
          relations:['author']
        })
      }
}