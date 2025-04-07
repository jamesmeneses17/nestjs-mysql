import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  createdPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Get()
  getPosts() {
    return this.postsService.getPost();
  }
}
