/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { BlogStatus } from './blog-status-enum';
import { BlogsService } from './blogs.service';
import { Blog } from './dto/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetBlogsFilterDto } from './dto/get-blogs-filter.dto';
import { UpdateBlogStatusDto } from './dto/update-blog-status.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  getBlogs(@Query() filterDto: GetBlogsFilterDto): Promise<Blog[]> {
    //have filters defined ? call blogsService.getBlogWithFilter
    // note ? getAllBlogs

    return this.blogsService.getBlogs(filterDto);
    }
  
  // @Get('/:id')
  // getBlogById(@Param('id') id: string):Blog {
  //   return this.blogsService.getBlogById(id);
  // }
  @Get('/:id')
    getBlogById(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.getBlogById(id);
  }

  @Post()
  createBlog(
    @Body() CreateBlogDto: CreateBlogDto): Promise<Blog> {
        return this.blogsService.createBlog(CreateBlogDto);
    }

  @Delete('/:id')
  deleteBlog(@Param('id') id: string): Promise<void>{
    return this.blogsService.deleteBlog(id);
  }

  @Patch('/:id/status')
  updateBlogStatus(
    @Param('id') id: string,
    @Body() updateBlogStatusDto: UpdateBlogStatusDto,
  ): Promise<Blog> {
    const { status } = updateBlogStatusDto;
    return this.blogsService.updateBlogStatus(id,status);
  }

  

}
