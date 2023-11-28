/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BlogStatus } from '../blog-status-enum';

export class GetBlogsFilterDto{
    //decorator IsOptional help we get all blog with no ID input
    //@IsOptional()
    @IsEnum(BlogStatus)
    status?: BlogStatus;

    //@IsOptional()
    @IsString()
    search?: string;
}
