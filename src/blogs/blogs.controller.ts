/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Blog } from './blog.model';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  getAllBlogs(): Blog[] {
    return this.blogsService.getAllBlogs();
  }

  @Get('/:id')
  getBlogById(@Param('id') id: string):Blog {
    return this.blogsService.getBlogById(id);
  }

  @Post()
  createBlog(
    @Body() createBlogDto: CreateBlogDto): Blog {
        return this.blogsService.createBlog(createBlogDto);
    }

  @Delete('/:id')
  deleteBlog(@Param('id') id: string): void{
    return this.blogsService.deleteBlog(id);
  }
}
