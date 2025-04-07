import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Post } from './post.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]), UsersModule
    ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
