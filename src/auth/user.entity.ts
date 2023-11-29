/* eslint-disable prettier/prettier */
import { Blog } from "src/blogs/dto/blog.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ unique:true })
    username: string;

    @Column()
    password: string;

    @OneToMany((_type) => Blog, blog => blog.user, {eager:true})
    blogs: Blog[];
}