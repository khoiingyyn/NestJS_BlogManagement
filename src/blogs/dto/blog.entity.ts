/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlogStatus } from '../blog-status-enum';


@Entity()
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content:string;

    @Column()
    status: BlogStatus;

    @ManyToOne((_type) => User, (user) => user.blogs, {eager:false})
    @Exclude({ toPlainOnly: true  })
    user: User;
}