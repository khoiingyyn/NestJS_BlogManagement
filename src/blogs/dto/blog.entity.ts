/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}