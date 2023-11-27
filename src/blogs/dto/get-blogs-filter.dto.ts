/* eslint-disable prettier/prettier */
import { BlogStatus } from '../blog.model';

export class GetBlogsFilterDto{
    status?: BlogStatus;
    search?: string;
}
