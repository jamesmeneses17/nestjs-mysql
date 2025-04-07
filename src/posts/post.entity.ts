import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../users/user.entity"


@Entity()
export class Post {

@PrimaryGeneratedColumn()  
id: number

@Column()
//title of the post
title:string

@Column()
content:string


@Column()
authorId: number;

@ManyToOne(() => User, user => user.posts)
author: User


}