/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogStatus } from './blog-status-enum';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetBlogsFilterDto } from './dto/get-blogs-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './dto/blog.entity';
import { Repository } from 'typeorm';
@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blog)
        private blogsRepository: Repository<Blog>,
    ) {}

    
    async getBlogs(filterDto:GetBlogsFilterDto): Promise<Blog[]>{
        const query = this.blogsRepository.createQueryBuilder('blog');

        const blogs = await query.getMany();

        return blogs;

    }

    async getBlogById(id: string): Promise<Blog> 
    {
        const found = await this.blogsRepository.findOne({
            where:
            {
                id:id,
            }
        });
        if(!found){
            throw new NotFoundException(`Your ID "${id}" of Blog is not found !`);
            
        }
        return found;

    }

        async createBlog(CreateBlogDto: CreateBlogDto): Promise<Blog> {
        const { title, content } = CreateBlogDto;

        const blog = this.blogsRepository.create({
            title,
            content,
            status: BlogStatus.PENDING,
            });
        await this.blogsRepository.save(blog);
        return blog;
    }

  

        async deleteBlog(id: string): Promise<void> {
            const result = await this.blogsRepository.delete(id);
            
            if(result.affected === 0) {
                throw new NotFoundException(`The Blog with ID: "${id}" not found`)
            }

    }

    async updateBlogStatus(id: string, status: BlogStatus): Promise<Blog>{
        const blog = await this.getBlogById(id);

        blog.status = status;
        await this.blogsRepository.save(blog);
        return blog;
    }

}
