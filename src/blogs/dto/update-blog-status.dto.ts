/* eslint-disable prettier/prettier */
import { BlogStatus } from '../blog.model';
import { IsEnum } from 'class-validator';

export class UpdateBlogStatusDto {
    @IsEnum(BlogStatus)
    status : BlogStatus;
}