/* eslint-disable prettier/prettier */
import { BlogStatus } from '../blog-status-enum';
import { IsEnum } from 'class-validator';

export class UpdateBlogStatusDto {
    @IsEnum(BlogStatus)
    status : BlogStatus;
}