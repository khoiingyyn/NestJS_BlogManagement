/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { Blog, BlogStatus } from './blog.model';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetBlogsFilterDto } from './dto/get-blogs-filter.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  getBlogs(@Query() filterDto: GetBlogsFilterDto): Blog[] {
    //have filters defined ? call blogsService.getBlogWithFilter
    // note ? getAllBlogs

    if(Object.keys(filterDto).length){
      return this.blogsService.getBlogWithFilters(filterDto);

    } else {
    return this.blogsService.getAllBlogs();
    }
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

  @Patch('/:id/status')
  updateBlogStatus(
    @Param('id') id: string,
    @Body('status') status: BlogStatus,
  ): Blog {
    return this.blogsService.updateBlogStatus(id,status);
  }


}
